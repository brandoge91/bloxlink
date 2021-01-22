// @ts-check
const { fetch } = require('node-fetch')

const baseRoverAPIUrl = "https://verify.eryn.io/api/user/";
const baseRobloxAPIUrl = "https://api.roblox.com/";

/**
 * @param {string|number} userId
 * @param {string|number} [guildId]
 */
exports.getRoverUser = async function (userId, guildId) {
  // Parameter Checks
  if (!userId) return { error: "Did not provide 'userId' parameter." };
  if (isNaN(Number(userId)))
    return { error: "The 'userId' parameter must be a number." };
  if (guildId && isNaN(Number(userId)))
    return { error: "The 'guildId' parameter must be a number." };

  // Send API request to Bloxlink for information
  let response;
  if (guildId) {
    response = await (
      await fetch(`${baseRoverAPIUrl}user/${userId}?guild=${guildId}`)
    ).json();
  } else {
    response = await (
      await fetch(`${baseRoverAPIUrl}user/${userId}`)
    ).json();
  }

  // Check if being ratelimited
  if (response.status === 429) {
    return { status: "error", error: "You are being ratelimited." };
  }

  // Handle user not being linked with Bloxlink
  if (response.error === "This user is not linked with RoVer.") {
    return response;
  }

  // Get latest username
  const username = await (
    await fetch(`${baseRobloxAPIUrl}/${response.primaryAccount}`)
  ).json();

  // Return data
  return {
    status: response.status,
    robloxId: response.primaryAccount,
    robloxUsername: username.Username,
  };
}
