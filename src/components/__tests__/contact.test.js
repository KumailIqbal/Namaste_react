import { render, screen } from "@testing-library/react";
import Contact from "../Contact"
import "@testing-library/jest-dom"



test("should load the contact us component", ()=>{
    render(<Contact />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
});

test("Should have button in the contact component", ()=>{
    render(<Contact/>);

    const button= screen.getByText("Submit");
    expect(button).toBeInTheDocument();
});

it("Should have 2 input boxes", ()=>{
    render(<Contact/>);

    const input = screen.getAllByRole("textbox");
    expect(input.length).toBe(2);
})