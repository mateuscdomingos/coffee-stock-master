import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  it("should render correctly", () => {
    render(<Home />);

    const element = screen.getByText("To get started, edit the page.tsx file.");

    expect(element).toBeInTheDocument();
  });
});
