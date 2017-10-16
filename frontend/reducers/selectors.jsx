export const selectPage = ({ pages, widgets }, id) => {
   const page = pages[id] || {};
   return page
};

export const asArray = ({ widgets }) => (
  Object.keys(widgets).map(key => benches[key])
);