import Colors from "@/constants/colors";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Stop,
  Svg,
} from "react-native-svg";
export interface PriceHistoryPoint {
  date: string;
  price: number;
}

interface Props {
  data: PriceHistoryPoint[];
}

// --- Constants for SVG layout ---
const CHART_WIDTH = 350;
const CHART_HEIGHT = 100; // Use 100 for the main chart area (0 to 100)
const PADDING_BOTTOM = 20; // Extra space for labels/padding

// --- Helper function for Cubic Bézier Curve Path (more accurate smoothness) ---
function createSmoothPath(points: Array<{ x: number; y: number }>): {
  linePath: string;
  areaPath: string;
} {
  if (points.length < 2) {
    return { linePath: "", areaPath: "" };
  }

  // Calculate control points (simplified Catmull-Rom style for smoothness)
  // This is a common method for creating smooth lines in SVG
  interface Point {
    x: number;
    y: number;
  }

  interface ControlPoints {
    cp1: Point;
    cp2: Point;
  }

  const calculateControlPoints = (
    p0: Point,
    p1: Point,
    p2: Point,
    p3: Point,
    tension: number = 0.4
  ): ControlPoints => {
    const d1 = Math.sqrt(Math.pow(p2.x - p0.x, 2) + Math.pow(p2.y - p0.y, 2));
    const d2 = Math.sqrt(Math.pow(p3.x - p1.x, 2) + Math.pow(p3.y - p1.y, 2));

    const cp1x = p1.x + ((p2.x - p0.x) / d1) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / d1) * tension;
    const cp2x = p2.x - ((p3.x - p1.x) / d2) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / d2) * tension;

    // Simplified control point calculation for a smoother curve without external libraries
    const cp1_x: number = p1.x + (p2.x - p0.x) / 6;
    const cp1_y: number = p1.y + (p2.y - p0.y) / 6;
    const cp2_x: number = p2.x - (p3.x - p1.x) / 6;
    const cp2_y: number = p2.y - (p3.y - p1.y) / 6;

    return {
      cp1: { x: cp1_x, y: cp1_y },
      cp2: { x: cp2_x, y: cp2_y },
    };
  };

  let linePath = `M ${points[0].x},${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : points[i + 1];

    // Using a simplified method for calculating control points
    const { cp1, cp2 } = calculateControlPoints(p0, p1, p2, p3);

    linePath += ` C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${p2.x},${p2.y}`;
  }

  const areaPath = `${linePath} L ${
    points[points.length - 1].x
  } ${CHART_HEIGHT} L ${points[0].x} ${CHART_HEIGHT} Z`;

  return { linePath, areaPath };
}

const PriceHistoryChart: React.FC<Props> = ({ data }) => {
  // Use useMemo for heavy calculations
  const {
    prices,
    minPrice,
    maxPrice,
    priceRange,
    normalizedPoints,
    xAxisLabels,
    pathData,
    startEndChange,
  } = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        prices: [],
        minPrice: 0,
        maxPrice: 0,
        priceRange: 0,
        normalizedPoints: [],
        xAxisLabels: [],
        pathData: { linePath: "", areaPath: "" },
        startEndChange: 0,
      };
    }

    const prices = data.map((d) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Calculate start-to-end price change for header text
    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    const startEndChange = endPrice - startPrice;

    // Normalize data and scale points for the SVG viewBox (0 to CHART_WIDTH/CHART_HEIGHT)
    const normalizedPoints = data.map((d, idx) => {
      // Scale value from 0-100 (if priceRange > 0) or 50 (if flat)
      const normalizedValue =
        priceRange === 0 ? 50 : ((d.price - minPrice) / priceRange) * 100;

      // X: Horizontal position (0 to CHART_WIDTH)
      const x = (idx / (data.length - 1)) * CHART_WIDTH;

      // Y: Vertical position. In SVG, Y=0 is the top, Y=CHART_HEIGHT is the bottom.
      // We flip the normalized value (0=low, 100=high) to fit the SVG coordinates (0=high, 100=low)
      // We also scale down slightly (e.g., *0.8) to allow for padding/better visual fit if needed.
      // Using 100 - normalizedValue directly, which fits perfectly into our 0-100 Y-space.
      const y = CHART_HEIGHT - normalizedValue;

      return { x, y, originalPrice: d.price };
    });

    const xAxisLabels = data.map((d) =>
      new Date(d.date).toLocaleDateString("en-US", { weekday: "short" })
    );

    const pathData = createSmoothPath(normalizedPoints);

    return {
      prices,
      minPrice,
      maxPrice,
      priceRange,
      normalizedPoints,
      xAxisLabels,
      pathData,
      startEndChange,
    };
  }, [data]);

  if (data.length === 0) {
    return <Text>No price history data available.</Text>;
  }

  const priceChangeText =
    startEndChange === 0
      ? "No change"
      : startEndChange > 0
      ? `+GH₵${startEndChange.toFixed(2)}`
      : `-GH₵${Math.abs(startEndChange).toFixed(2)}`;

  // Determine color based on price change
  const chartColor = startEndChange >= 0 ? "#1E9E6A" : "#E91E63"; // Green or Red/Pink

  // A visual representation of the chart logic would be helpful for complex topics like this.
  //

  return (
    <View style={styles.container}>
      <View style={styles.chartCard}>
        <View style={styles.header}>
          <View style={styles.priceInfo}>
            <Text style={[styles.currentPrice, { color: chartColor }]}>
              GH₵{prices[prices.length - 1].toFixed(2)}
            </Text>
            <Text
              style={[
                styles.priceChange,
                { color: startEndChange >= 0 ? "#1E9E6A" : "#E91E63" },
              ]}
            >
              {priceChangeText}
            </Text>
          </View>
        </View>

        <Svg
          // The viewBox is now standardized based on constants
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT + PADDING_BOTTOM}`}
          style={styles.svg}
          preserveAspectRatio="none"
        >
          {/* Grid lines for reference */}
          <Line
            x1="0"
            y1={CHART_HEIGHT * 0.25}
            x2={CHART_WIDTH}
            y2={CHART_HEIGHT * 0.25}
            stroke="#f0f0f0"
            strokeWidth="1"
          />
          <Line
            x1="0"
            y1={CHART_HEIGHT * 0.5}
            x2={CHART_WIDTH}
            y2={CHART_HEIGHT * 0.5}
            stroke="#f0f0f0"
            strokeWidth="1"
          />
          <Line
            x1="0"
            y1={CHART_HEIGHT * 0.75}
            x2={CHART_WIDTH}
            y2={CHART_HEIGHT * 0.75}
            stroke="#f0f0f0"
            strokeWidth="1"
          />

          {/* Area fill gradient */}
          <Defs>
            <LinearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={chartColor} stopOpacity="0.4" />
              <Stop offset="100%" stopColor={chartColor} stopOpacity="0.05" />
            </LinearGradient>
          </Defs>

          {/* Area Fill */}
          <Path d={pathData.areaPath} fill="url(#areaGradient)" stroke="none" />

          {/* Line */}
          <Path
            d={pathData.linePath}
            fill="none"
            stroke={chartColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {normalizedPoints.map((point, idx) => (
            <G key={idx}>
              <Circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill={chartColor}
                stroke="white"
                strokeWidth="2"
              />
            </G>
          ))}
        </Svg>

        {/* X-axis labels */}
        <View style={styles.xAxisContainer}>
          {xAxisLabels.map((label, idx) => (
            <Text key={idx} style={styles.xAxisLabel}>
              {label}
            </Text>
          ))}
        </View>

        {/* Price range indicator */}
        <View style={styles.rangeInfo}>
          <Text style={styles.rangeLabel}>Low: GH₵{minPrice.toFixed(2)}</Text>
          <Text style={styles.rangeLabel}>High: GH₵{maxPrice.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

export default PriceHistoryChart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 16,
    justifyContent: "center",
  },
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
  },
  priceInfo: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8, // Use gap for spacing instead of margin on Text
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: "700",
    // Color set dynamically
  },
  priceChange: {
    fontSize: 14,
    fontWeight: "500",
    // Color set dynamically
  },
  svg: {
    width: "100%",
    height: 120,
    marginBottom: 8,
  },
  xAxisContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  xAxisLabel: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
  },
  rangeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  rangeLabel: {
    fontSize: 11,
    color: "#999",
  },
});
