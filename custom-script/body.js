async function testFetch() {
  try {
    const fetchRes = await fetch("https://rushikesh-shinde.webflow.io/coverage-entries/api/cms/fetch");
    const fetchJson = await fetchRes.json();
    console.log("FETCH RESULT:", fetchJson);

    const searchRes = await fetch("https://rushikesh-shinde.webflow.io/coverage-entries/api/cms/search?q=p");
    const searchJson = await searchRes.json();
    console.log("SEARCH RESULT:", searchJson);

  } catch (error) {
    console.error("API ERROR:", error);
  }
}

testFetch();
