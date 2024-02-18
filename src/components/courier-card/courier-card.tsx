import { Courier } from "../../types";
import { Text } from "../typhography/text/text";

import "./style.css";

export const CourierCard: React.FC<{ courier: Courier }> = ({ courier }) => {
  return (
    <div className="courier-card">
      <div className="courier-card__courier-section">
        <Text
          style={{
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {courier.name}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: "14px",
          }}
        >
          {courier.costs.length} services
        </Text>
      </div>
      <div className="courier-card__services-section">
        {courier.costs.map((courierCost) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "16px",
              }}
            >
              {courierCost.service}
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "14px",
              }}
            >
              Rp. {courierCost.cost[0].value.toLocaleString()} (
              {courierCost.cost[0].etd.split("HARI")[0]} days)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
