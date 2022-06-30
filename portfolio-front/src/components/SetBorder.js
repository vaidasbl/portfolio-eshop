const SetBorder = (location, active, setActive) => {
  if (location.pathname === "/eshop") {
    setActive({
      ...active,
      items: false,
      cart: false,
      login: false,
      admin: false,
      home: true,
    });
  } else if (
    location.pathname === "/eshop/items" ||
    location.pathname.includes("items/")
  ) {
    setActive({
      ...active,
      items: true,
      cart: false,
      login: false,
      admin: false,
      home: false,
    });
  } else if (location.pathname === "/eshop/cart") {
    setActive({
      ...active,
      items: false,
      cart: true,
      login: false,
      admin: false,
      home: false,
    });
  } else if (location.pathname === "/eshop/login") {
    setActive({
      ...active,
      items: false,
      cart: false,
      login: true,
      admin: false,
      home: false,
    });
  } else if (location.pathname.includes("admin")) {
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
