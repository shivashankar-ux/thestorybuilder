import https from "https";

async function testLiveApi() {
  console.log("Sending POST request to https://thestorybuilder.in/api/create-order ...");

  const postData = JSON.stringify({
    ebook_id: "7-day-web-design-blueprint",
    amount: 49900,
    buyer_name: "Test User",
    buyer_email: "test@example.com"
  });

  const options = {
    hostname: "www.thestorybuilder.in",
    port: 443,
    path: "/api/create-order",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`HTTP STATUS: ${res.statusCode}`);
    let data = "";
    res.on("data", (chunk) => { data += chunk; });
    res.on("end", () => {
      console.log("RESPONSE BODY:", data);
    });
  });

  req.on("error", (e) => {
    console.error("REQUEST ERROR:", e);
  });

  req.write(postData);
  req.end();
}

testLiveApi();
