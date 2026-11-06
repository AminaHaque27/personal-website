import { render, screen } from "@testing-library/react";
import App from "./App";

test("home page shows the name and main sections", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Amina Haque" })
  ).toBeInTheDocument();
  ["Experience", "Projects", "Skills", "Education", "Contact"].forEach(
    (title) => {
      expect(
        screen.getByRole("heading", { level: 2, name: title })
      ).toBeInTheDocument();
    }
  );
});
