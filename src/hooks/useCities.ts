import { useEffect, useState } from "react";
import JSONCities from "../data/cities.json";

export function useCities(props?: { search?: string }) {
  const [cities, setCities] = useState<typeof JSONCities>([]);

  useEffect(() => {
    const filteredCities = JSONCities.filter((city) =>
      city.city_name.toLowerCase().includes(props?.search?.toLowerCase() ?? "")
    );
    setCities(filteredCities);
  }, [props?.search]);

  return { cities };
}
