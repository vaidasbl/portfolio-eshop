const { render, screen, fireEvent } = require("@testing-library/react");
const {
  default: AdminAddNewItem,
} = require("../../components/05 Shop Item/AdminAddNewItem");

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Form test", () => {
  test("Item name updates", () => {
    render(<AdminAddNewItem />);
    const itemNameField = screen.getByLabelText("Item name");
    const inputValue = "itemnameitemname";
    fireEvent.change(itemNameField, { target: { value: inputValue } });
    expect(itemNameField.value).toBe("itemnameitemname");
  });

  test("Item price doesnt update when letter is entered", () => {
    render(<AdminAddNewItem />);
    const itemPriceField = screen.getByLabelText("Item price");
    const inputValue = "lmnop";
    fireEvent.change(itemPriceField, { target: { value: inputValue } });
    expect(itemPriceField.value).toBe("");
  });

  test("Item price update when number is entered", () => {
    render(<AdminAddNewItem />);
    const itemPriceField = screen.getByLabelText("Item price");
    const inputValue = "123";
    fireEvent.change(itemPriceField, { target: { value: inputValue } });
    expect(itemPriceField.value).toBe("123");
  });
});

describe("Save button test", () => {
  test("Save button is enabled when all fields are filled", () => {
    render(<AdminAddNewItem />);
    const saveButton = screen.getByTestId("savebtn");

    expect(saveButton).toBeDisabled();

    const itemNameField = screen.getByLabelText("Item name");
    const itemDescriptionField = screen.getByLabelText("Item description");
    const itemPriceField = screen.getByLabelText("Item price");
    const itemStockField = screen.getByLabelText("Stock");
    const itemImagePathField = screen.getByLabelText("Image path");

    const fields = [
      itemNameField,
      itemDescriptionField,
      itemPriceField,
      itemStockField,
      itemImagePathField,
    ];

    fields.forEach((field) =>
      fireEvent.change(field, { target: { value: "1515" } })
    );

    expect(saveButton).toBeEnabled();
  });

  test("Save button is disabled if any of the fields are empty", () => {
    render(<AdminAddNewItem />);
    const saveButton = screen.getByTestId("savebtn");
    expect(saveButton).toBeDisabled();

    const itemNameField = screen.getByLabelText("Item name");
    const itemDescriptionField = screen.getByLabelText("Item description");
    const itemPriceField = screen.getByLabelText("Item price");
    const itemStockField = screen.getByLabelText("Stock");
    //const itemImagePathField = screen.getByLabelText("Image path");

    const fields = [
      itemNameField,
      itemDescriptionField,
      itemPriceField,
      itemStockField,
      // itemImagePathField,
    ];

    fields.forEach((field) =>
      fireEvent.change(field, { target: { value: "1515" } })
    );

    expect(saveButton).toBeDisabled();
  });
});
