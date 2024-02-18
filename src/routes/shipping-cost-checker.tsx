import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useCities } from "../hooks/useCities";
import { Dropdown } from "../components/ui/dropdown/dropdown";
import { Title } from "../components/typhography/title/title";
import { Button } from "../components/ui/button/button";
import { Input } from "../components/ui/input/input";
import { useSession } from "../contexts/sessionContext";
import { ShippingCostCheckerForm } from "../components/shipping-cost-checker-form";
import { Fieldset } from "../components/fieldset";
import { Label } from "../components/ui/label";
import { City, ShippingCost } from "../types/index.ts";
import { Container } from "../components/container/index.tsx";
import { CourierCard } from "../components/courier-card/courier-card.tsx";
import { Layout } from "../components/layout/index.tsx";
import { Text } from "../components/typhography/text/text.tsx";

export const Route = createFileRoute("/shipping-cost-checker")({
  component: ShipingCostCheckerPage,
});

function ShipingCostCheckerPage() {
  const [originCity, setOriginCity] = useState<City>();
  const [destinationCity, setDestinationCity] = useState<City>();
  const [weight, setWeight] = useState(0);

  const [cityQuery, setCityQuery] = useState<string>("");

  const [activeCitiesDropdown, setActiveCitiesDropdown] = useState<
    "destination" | "origin"
  >();

  const [isLoading, setIsLoading] = useState(false);

  const [shippingCost, setShippingCost] = useState<ShippingCost>();

  const { cities } = useCities({
    search: cityQuery,
  });

  const originInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);

  const { session } = useSession();
  const navigate = useNavigate();

  function searchCity(
    event: React.ChangeEvent<HTMLInputElement>,
    cityType: "origin" | "destination"
  ) {
    setActiveCitiesDropdown(cityType);
    setCityQuery(event.target.value);
    if (event.target.value === "") {
      setActiveCitiesDropdown(undefined);
    }

    if (cityType === "destination") {
      setDestinationCity(undefined);
    }

    if (cityType === "origin") {
      setOriginCity(undefined);
    }
  }

  function selectOriginCity(city: { id: string; name: string }) {
    if (originInputRef.current) {
      originInputRef.current.value = city.name;
    }
    setActiveCitiesDropdown(undefined);
    setOriginCity(city);
  }

  function selectDestinationCity(city: { id: string; name: string }) {
    if (destinationInputRef.current) {
      destinationInputRef.current.value = city.name;
    }
    setActiveCitiesDropdown(undefined);
    setDestinationCity(city);
  }

  async function getCouriers() {
    setIsLoading(true);
    const result = await fetch(
      "https://dot-challenge-api.vercel.app/api/shipping-cost",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: originCity?.id,
          destination: destinationCity?.id,
          weight: weight,
        }),
      }
    );

    const shippingCost = await result.json();
    setShippingCost(shippingCost);
    setIsLoading(false);
  }

  if (session.username === "") navigate({ to: "/login" });
  return (
    <Layout title="Shipping Cost Checker">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Title style={{ marginBottom: "1rem", textAlign: "center" }}>
          Shipping Cost Checker
        </Title>
        <ShippingCostCheckerForm
          onSubmit={(event) => {
            event?.preventDefault();
            getCouriers();
          }}
          style={{ marginBottom: "24px" }}
        >
          <Fieldset>
            <Label htmlFor="input__origin">Origin City</Label>
            <Input
              id="input__origin"
              type="text"
              placeholder="Input origin city"
              ref={originInputRef}
              onChange={(event) => searchCity(event, "origin")}
            />
            <Dropdown
              isOpen={activeCitiesDropdown === "origin"}
              onOpenChange={() => setActiveCitiesDropdown(undefined)}
            >
              {cities.length > 0 &&
                cities?.map((city) => (
                  <Dropdown.Item
                    key={city.city_id}
                    label={city.city_name}
                    onClick={() =>
                      selectOriginCity({
                        id: city.city_id,
                        name: city.city_name,
                      })
                    }
                  />
                ))}
              {cities.length < 1 && (
                <div
                  style={{
                    padding: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      color: "gray",
                      height: "72px",
                      fontSize: "12px",
                    }}
                  >
                    Not Found
                  </span>
                </div>
              )}
            </Dropdown>
          </Fieldset>
          <Fieldset>
            <Label
              htmlFor="input__destination"
              style={{ fontFamily: "monospace", fontSize: "16px" }}
            >
              Destination City
            </Label>
            <Input
              id="input__destination"
              placeholder="Input destination city"
              ref={destinationInputRef}
              onChange={(event) => searchCity(event, "destination")}
            />
            <Dropdown
              isOpen={activeCitiesDropdown === "destination"}
              onOpenChange={() => setActiveCitiesDropdown(undefined)}
            >
              {cities.length > 0 &&
                cities?.map((city) => (
                  <Dropdown.Item
                    key={city.city_id}
                    label={city.city_name}
                    onClick={() =>
                      selectDestinationCity({
                        id: city.city_id,
                        name: city.city_name,
                      })
                    }
                  />
                ))}
              {cities.length < 1 && (
                <div
                  style={{
                    padding: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      color: "gray",
                      height: "72px",
                      fontSize: "12px",
                    }}
                  >
                    Not Found
                  </span>
                </div>
              )}
            </Dropdown>
          </Fieldset>

          <Fieldset>
            <Label htmlFor="input__weight">Weight</Label>
            <Input
              type="number"
              id="input__weight"
              placeholder="Input weight in gram"
              onChange={(event) => setWeight(parseInt(event?.target?.value))}
              suffix="Gram"
            />
          </Fieldset>
          <Button
            disabled={!originCity || !destinationCity || !weight}
            style={{ width: "175px" }}
          >
            Submit
          </Button>
        </ShippingCostCheckerForm>
        {isLoading || (shippingCost?.courierCosts?.length as number) > 0 ? (
          <Container>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontFamily: "Poppins",
                  fontWeight: "normal",
                }}
              >
                Shipping Costs
              </h2>
              <Text style={{ fontSize: "14px" }}>
                from <strong>{shippingCost?.origin}</strong> to{" "}
                <strong>{shippingCost?.destination}</strong>
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "100%",
              }}
            >
              {isLoading && (
                <Text style={{ fontSize: "14px" }}>Getting Data...</Text>
              )}
              {!isLoading &&
                shippingCost?.courierCosts?.map((courier) => (
                  <CourierCard courier={courier} />
                ))}
            </div>
          </Container>
        ) : null}
      </div>
    </Layout>
  );
}
