const { data } = JSON.parse(
  await Deno.readTextFile("./tmp/getPortfolioGroupsInventory.json")
);

Deno.writeTextFile(
  "./scalableCapital.json",
  JSON.stringify(
    data.account.brokerPortfolios[0].inventory.ungroupedInventoryItems.items.map(
      // deno-lint-ignore no-explicit-any
      (item: { [prop: string]: any }) => ({
        id: {
          wkn: item.wkn,
        },
        desc: "Scalable Capital",
        value:
          item.inventory.position.filled * item.inventory.position.fifoPrice,
        details: {
          _id: item.wkn,
          type: item.type === "ETF" ? "ETF (Aktien)" : "Aktien",
          title: item.name,
          isWKN: true,
        },
        who: "Basti",
      })
    ),
    null,
    2
  )
);
