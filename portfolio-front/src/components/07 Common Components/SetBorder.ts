type Navbar = {
  home: boolean;
  items: boolean;
  cart: boolean;
  login: boolean;
  admin: boolean;
};

const SetBorder = (
  location: string,
  active: Navbar,
  setActive: React.Dispatch<React.SetStateAction<Navbar>>
) => {
  if (location === "/eshop") {
    setActive({
      ...active,
      items: false,
      cart: false,
      login: false,
      admin: false,
      home: true,
    });
  } else if (location === "/eshop/items" || location?.includes("items/")) {
    setActive({
      ...active,
      items: true,
      cart: false,
      login: false,
      admin: false,
      home: false,
    });
  } else if (location === "/eshop/cart") {
    setActive({
      ...active,
      items: false,
      cart: true,
      login: false,
      admin: false,
      home: false,
    });
  } else if (location === "/eshop/login") {
    setActive({
      ...active,
      items: false,
      cart: false,
      login: true,
      admin: false,
      home: false,
    });
  } else if (location?.includes("admin")) {
    setActive({
      ...active,
      items: false,
      cart: false,
      login: false,
      admin: true,
      home: false,
    });
  }
};

export default SetBorder;
