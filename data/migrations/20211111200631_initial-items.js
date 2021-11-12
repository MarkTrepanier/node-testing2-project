exports.up = function (knex) {
  return knex.schema.createTable("items", (tbl) => {
    tbl.increments("item_id");
    tbl.string("item_name", 120).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("items");
};
