/* Alle Preise und Texte des Menuboards. Quelle: offizielle Mmaah Karte (Mmaah-Menu.pdf, Stand 10.09.2026). Preis ändern, dann tools/render.py neu laufen lassen.
   tags: vegan, veggie, spicy wie in der Karte. fuss: * Farbstoff, ** Koffein, *** Farbstoff und Koffein. w: Titel auf der Website für Text und Allergene. */
window.MB_KARTE = {
  bites: { name: "Boneless Bites", bild: "korean-fried-chicken-7st", preise: [["7 Stk.", 6.9], ["12 Stk.", 10.9]], w: "Boneless Bites" },
  wings: { name: "BBQ Wings", bild: "bbq-wings", preise: [["6 Stk.", 6.9], ["10 Stk.", 10.9]], w: "BBQ Wings" },
  bitesfries: { name: "6 Stk. Boneless Bites", kurz: "Mit K-Fries", bild: "boneless-bites-und-fries", preis: 8.9, w: "Boneless Bites & Fries" },
  wingsfries: { name: "5 Stk. BBQ Wings", kurz: "Mit K-Fries", bild: "bbq-wings-und-fries", preis: 8.9, w: "BBQ Wings & Fries" },
  bucketbites: { name: "Boneless Bites", kurz: "21 Stk.", bild: "mmaah-bites-bucket", preis: 17.9, w: "Boneless Bites Bucket" },
  bucketwings: { name: "BBQ Wings", kurz: "18 Stk.", bild: "mmaah-wings-bucket", preis: 17.9, w: "BBQ Wings Bucket" },
  bucketmixed: { name: "Mixed", kurz: "12 Stk. Boneless Bites + 8 Stk. BBQ Wings", bild: "mmaah-mixed-bucket", preis: 17.9, w: "Mixed Bucket" },

  bulgogi: { name: "Bul Gogi", kurz: "Süß-würzig mariniertes Rindfleisch", bild: "bul-gogi", preis: 10.5, w: "Bul Gogi" },
  chibap: { name: "Chi Bap", kurz: "Knusprige Chicken Bites", bild: "crispy-chicken-bites-rice", preis: 9.5, w: "Chi Bap" },
  bbqmix: { name: "BBQ Mix", kurz: "Mariniertes Rind- / Hähnchenfleisch", bild: "bulgogi-beef", preis: 10.9, tags: ["spicy"], w: "BBQ Mix" },
  hotgogi: { name: "Hot Gogi", kurz: "Pikant mariniertes Hähnchenfleisch", bild: "hotgogi", preis: 9.5, tags: ["spicy"], w: "Hot Gogi" },
  galbi: { name: "Chicken Galbi", kurz: "Süß-herzhaft glasiertes Hähnchenfleisch", bild: "chicken-galbi", preis: 9.5, w: "Chicken Galbi" },
  katsu: { name: "Korean Katsu", kurz: "Knusprig paniertes Hähnchenfilet", bild: "korean-katsu-rice", preis: 8.5, w: "Korean Katsu" },
  mandubap: { name: "Mandu Bap", kurz: "Vegane Teigtaschen", bild: "mandu-veggie-rice", preis: 8.5, tags: ["vegan"], w: "Mandu Bap" },
  plantbased: { name: "Plantbased BBQ", kurz: "Süß-herzhaftes pflanzliches BBQ auf Soja- / Weizenbasis", bild: "plantbased-bbq-rice", preis: 8.5, tags: ["vegan"], w: "Plantbased BBQ" },
  kids: { name: "Kids Meal", kurz: "Kleine Portion Reisgericht mit Wundertüte. Chicken Galbi oder Mandu Bap (vegan)", bild: "chicken-teriyaki-rice-kidsmeal", preis: 4.9, w: "Chicken Galbi Kidsmeal" },

  gangnam: { name: "Gangnam Beef", kurz: "Mit Bul Gogi, Sesam- und Käsesauce", bild: "gangnam-fries", preis: 8.9, w: "Gangnam Beef" },
  hongdae: { name: "Hongdae Chicken", kurz: "Mit Chicken Galbi, K-BBQ- und Käsesauce", bild: "hongdae-chicken", preis: 7.9, w: "Hongdae Chicken" },
  busan: { name: "Busan Spicy", kurz: "Mit Hot Gogi, Gochu Mayo, Chili- und Käsesauce", bild: "busan-spicy", preis: 7.9, tags: ["spicy"], w: "Busan Spicy" },
  seoul: { name: "Seoul Veggie BBQ", kurz: "Mit Plantbased K-BBQ, Sesam- und Käsesauce", bild: "seoul-veggie", preis: 7.5, tags: ["veggie"], w: "Seoul Veggie" },

  mandubeef: { name: "Beef Mandu", kurz: "4 Stk. mit herzhafter Füllung", bild: "mandu-beef", preis: 5, w: "Mandu Beef" },
  manduveggie: { name: "Veggie Mandu", kurz: "4 Stk. mit herzhafter Füllung", bild: "mandu-veggie", preis: 4.5, tags: ["vegan"], w: "Mandu Veggie" },
  mandukimchi: { name: "Kimchi Mandu", kurz: "4 Stk. mit herzhafter Füllung", bild: "mandu-kimchi", preis: 4.5, tags: ["vegan"], w: "Mandu Kimchi" },
  kcheese: { name: "K-Cheese Fries", kurz: "Pommes mit koreanischer Gewürzmischung und Käsesauce", bild: "k-cheese-fries", preis: 3.9, tags: ["veggie"], w: "K-Cheese Fries" },
  kimchipan: { name: "Kimchi Pancakes", kurz: "4 Stk. Knuspriger Pfannkuchen mit würzigem Kimchi", bild: "kimchi-pancakes", preis: 5.5, tags: ["veggie"], w: "Kimchi Pancakes" },

  kfries: { name: "K-Fries", kurz: "Pommes mit koreanischer Gewürzmischung", bild: "k-fries", preis: 2.9, tags: ["vegan"], w: "K-Fries" },
  coleslaw: { name: "Korean Coleslaw Salat", kurz: "Frischer Krautsalat mit koreanischem Dressing", bild: "koreancoleslaw", preis: 2.5, tags: ["vegan"], w: "Korean Coleslaw" },
  radish: { name: "Pickled Radish", kurz: "Eingelegter Rettich", ill: "ill_staebchen.svg", preis: 1.9, tags: ["vegan"] },
  reis: { name: "Reis", kurz: "Gedämpfter Reis", bild: "reis", preis: 2.5, tags: ["vegan"], w: "Rice" },

  pancake: { name: "Cinnamon Pancake", kurz: "Saftige Pfannkuchen mit süßer Nuss-Zimtfüllung", bild: "cinnamon-pancake", preis: 3.5, tags: ["veggie"], w: "Cinnamon Pancake" },
  melona: { name: "Melona Eis", kurz: "Koreanisches Eis am Stiel. Melone / Erdbeer / Mango", bild: "melona-ice", preis: 3, tags: ["vegan"], w: "Melona Ice" },
  pepero: { name: "Pepero", kurz: "Koreanische Schoko-Knusperstäbchen. Original / Almond / Choco Cookie", bild: "pepero", preis: 2.5, tags: ["veggie"], w: "Pepero" },

  lemonade: { name: "Korean Lemonade", kurz: "Blue Lemonade* / Mango Passion Ade* / Blueberry Ade*", menge: "0,23 l", bild: "bluelemonade", preis: 3.9, w: "Blue Lemonade" },
  ksoft: { name: "Korean Soft Drink", kurz: "Milkis in Original / Strawberry* / Chilsung Limo", menge: "0,25 l", bild: "milkis-original", preis: 2.9, w: "Milkis Original" },
  soft: { name: "Soft Drink", kurz: "Cola*** / Cola Zero*** / Fanta*", menge: "0,33 l", bild: "coca-cola", preis: 2.9 },
  americano: { name: "Iced Americano", kurz: "Black** / Sweet**", menge: "0,23 l", preis: 3.9 },
  wasser: { name: "Wasser", kurz: "Still / Sprudel", menge: "0,33 l", bild: "spreequell-still", preis: 2.5 }
};
window.MB_DIPS = { preis: .6, liste: [["Soy Garlic", ["vegan"], ""], ["Yangnyom", [], "süß-pikant"], ["K-BBQ", [], ""], ["Gochu Mayo", [], ""], ["Lemon Mayo", [], ""], ["Cheese", ["veggie"], ""]] };
