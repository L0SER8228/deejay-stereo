module.exports = {
  name: "jump",
  description: "Jump to a specific track in the queue.",
  category: "music",
  usage: "<songIndex>",
  options: [{
    name: "index",
    description: "The song index to jump to",
    type: "NUMBER",
    required: true
  }],
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return bot.say.errorMessage(interaction, "There is no song in the queue.");

    const index = interaction.options.getNumber("index", true) - 1;

    if (index > queue.tracks.length || index < 0 || !queue.tracks[index])
      return bot.say.errorMessage(interaction, "Provided song index does not exist.");

    queue.jump(index);

    return bot.say.successMessage(interaction, `Jumped to song \`${index + 1}\`.`);
  }
};