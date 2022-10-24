export default (app) => {
  app.post(
    `/tenant/:tenantId/product-favorite`,
    require('./productFavoriteCreate').default,
  );
  app.put(
    `/tenant/:tenantId/product-favorite/:id`,
    require('./productFavoriteUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/product-favorite/import`,
    require('./productFavoriteImport').default,
  );
  app.delete(
    `/tenant/:tenantId/product-favorite`,
    require('./productFavoriteDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/product-favorite/autocomplete`,
    require('./productFavoriteAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/product-favorite`,
    require('./productFavoriteList').default,
  );
  app.get(
    `/tenant/:tenantId/product-favorite/:id`,
    require('./productFavoriteFind').default,
  );
  app.get(
    `/tenant/:tenantId/product-favorite/toggle/:productId`,
    require('./productFavoriteToggle').default,
  );
};
