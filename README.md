`rover` is a simple NPM module to interact with the [rover](rover.link) API.

a crappy remake of https://github.com/enjoyablee/bloxlink but instead of the bloxlink api, it uses roVer's!

## Installation

Use [NPM](https://www.npmjs.com/) to install Bloxlink.

```
npm install rover-get@latest
```

## Example

```js
import getRoverUser from "rover-get";

(async () => {
  console.log(
    await getRoverUser("528288312448909312", "372036754078826496")
  );
})();
```

The example above will log the information of the linked account on roVer with the user ID of `528288312448909312`:

```json
{
  "status": "ok",
  "robloxId": "263468606",
  "robloxUsername": "TheMasterMuff"
}
```

If there is no rover account linked with a user it will return:

```json
{"status":"error","errorCode":404,"error":"User not found."}```
```
If you hit the rate-limit of 60 requests per 60 seconds it will return:

```json
{ "status": "error", "error": "You are being ratelimited." }
```

Hope this makes your life a bit easier, have a good one!


Totally not made by me! I give all credit to https://github.com/enjoyablee/bloxlink for making this, i just modified it for the Rover Api!
