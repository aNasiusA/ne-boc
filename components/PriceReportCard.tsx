import React from "react";
import { 
  Image, 
  StyleSheet, 
  Text, 
  View 
} from "react-native";

export interface PriceReport {
  id: string;
  itemId: string;
  price: number;
  location: {
    market: string;
    coordinates?: { lat: number; long: number };
  };
  picture?: string;
  user: {
    username: string;
    profilePicture?: string;
  };
  createdAt: string;
}

interface Props {
  report: PriceReport;
}

const PriceReportCard: React.FC<Props> = ({ report }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: report.picture ?? "https://via.placeholder.com/200",
        }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.price}>GH₵ {report.price}</Text>
        <Text style={styles.market}>{report.location.market}</Text>
        <Text style={styles.user}>Posted by {report.user.username}</Text>
        <Text style={styles.time}>
          {new Date(report.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

export default PriceReportCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  info: {},
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#263238",
  },
  market: {
    fontSize: 14,
    marginTop: 4,
    color: "#607d8b",
  },
  user: {
    marginTop: 4,
    fontSize: 13,
    color: "#455a64",
  },
  time: {
    marginTop: 2,
    fontSize: 12,
    color: "#999",
  },
});
