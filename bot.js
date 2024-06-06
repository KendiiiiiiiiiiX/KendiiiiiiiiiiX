const { Client, GatewayIntentBits, PermissionsBitField, EmbedBuilder } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers, // Nécessaire pour gérer les membres
  ],
});

client.login('MTI0ODE3MzMzNjc3MzY1NjYxNg.G-_vib.r0LGbQ93YLOC3KONHpLrv0LNMyof7D86VV0oDw');

client.on("ready", () => {
  console.log(`Login process as: ${client.user.tag} was successful`);

  // Définir le statut du bot
  client.user.setPresence({
    activities: [{ name: 'my game', type: 'PLAYING' }],
    status: 'online'
  });
});

client.on('messageCreate', async message => {
  if (message.content === "!ping") {
    const embed = new EmbedBuilder()
      .setColor(0xFFFF00) // Couleur jaune
      .setAuthor({ 
        name: 'Ping Pong', 
        iconURL: 'https://cdn.discordapp.com/avatars/1247928635596472513/3fa23e4abc032002e3c023bd439d2780.png' 
      })
      .setDescription('**Pong!**')
      .setThumbnail('https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png')
      .setFooter({ 
        text: "KendiX's World.", 
        iconURL: 'https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png',
        timestamp: new Date().getTime()
      });
    message.channel.send({ embeds: [embed] });
  }

  if (message.content.startsWith(':mute')) {
    // Vérifiez si l'utilisateur a les permissions de muter les membres
    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      const embed = new EmbedBuilder()
        .setColor(0xFFFF00) // Couleur jaune
        .setAuthor({ 
          name: 'Permission refusée', 
          iconURL: 'https://cdn.discordapp.com/avatars/1247928635596472513/3fa23e4abc032002e3c023bd439d2780.png' 
        })
        .setDescription('Vous n\'avez pas la permission de muter les membres.')
        .setThumbnail('https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png')
        .setFooter({ 
          text: "KendiX's World.", 
          iconURL: 'https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png',
          timestamp: new Date().getTime()
        });
      message.channel.send({ embeds: [embed] });
      return;
    }
    
    // Extraire les arguments de la commande
    const args = message.content.split(' ').slice(1);
    const member = message.mentions.members.first();
    const duration = parseInt(args[1], 10); // Durée en minutes
    const reason = args.slice(2).join(' ');

    // Vérification des arguments
    if (!member || isNaN(duration) || !reason) {
      const embed = new EmbedBuilder()
        .setColor(0xFFFF00) // Couleur jaune
        .setAuthor({ 
          name: 'Format incorrect', 
          iconURL: 'https://cdn.discordapp.com/avatars/1247928635596472513/3fa23e4abc032002e3c023bd439d2780.png' 
        })
        .setDescription('Veuillez respecter la case : :mute @user duration raison')
        .setThumbnail('https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png')
        .setFooter({ 
          text: "KendiX's World.", 
          iconURL: 'https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png',
          timestamp: new Date().getTime()
        });
      message.channel.send({ embeds: [embed] });
      return;
    }

    const durationMs = duration * 60 * 1000; // Convertir les minutes en millisecondes

    try {
      // Mettre le membre en timeout
      await member.timeout(durationMs, reason);
      const embed = new EmbedBuilder()
        .setColor(0xFFFF00) // Couleur jaune
        .setAuthor({ 
          name: 'Membre muté', 
          iconURL: 'https://cdn.discordapp.com/avatars/1247928635596472513/3fa23e4abc032002e3c023bd439d2780.png' 
        })
        .setDescription(`${member.user.tag} a été **mute** pendant **${duration}** minutes pour la raison suivante : **${reason}**.`)
        .setThumbnail('https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png')
        .setFooter({ 
          text: "KendiX's World.", 
          iconURL: 'https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png',
          timestamp: new Date().getTime()
        });
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setColor(0xFFFF00) // Couleur jaune
        .setAuthor({ 
          name: 'Erreur', 
          iconURL: 'https://cdn.discordapp.com/avatars/1247928635596472513/3fa23e4abc032002e3c023bd439d2780.png' 
        })
        .setDescription('Une erreur s\'est produite en essayant de mute le membre.')
        .setThumbnail('https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png')
        .setFooter({ 
          text: "KendiX's World.", 
          iconURL: 'https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png',
          timestamp: new Date().getTime()
        });
      message.channel.send({ embeds: [embed] });
    }
  }

if (message.content.startsWith(':unmute')) {
    // Vérifiez si l'utilisateur a les permissions de muter les membres
    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
        const embed = new EmbedBuilder()
            .setColor(0xFFFF00) // Couleur jaune
            .setAuthor({
                name: 'Permission refusée',
                iconURL: 'https://cdn.discordapp.com/avatars/1247928635596472513/3fa23e4abc032002e3c023bd439d2780.png'
            })
            .setDescription('Vous n\'avez pas la permission de unmute les membres.')
            .setThumbnail('https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png')
            .setFooter({
                text: "KendiX's World.",
                iconURL: 'https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png',
                timestamp: new Date().getTime()
            });
        message.channel.send({ embeds: [embed] });
        return;
    }

    // Extraire les arguments de la commande
    const args = message.content.split(' ').slice(1);
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ');

// Vérification des arguments
if (!member || !reason) {
    const embed = new EmbedBuilder()
        .setColor(0xFFFF00) // Couleur jaune
        .setAuthor({
            name: 'Format incorrect',
            iconURL: 'https://cdn.discordapp.com/avatars/1247928635596472513/3fa23e4abc032002e3c023bd439d2780.png'
        })
        .setDescription('Veuillez respecter la case : :unmute @user raison')
        .setThumbnail('https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png')
        .setFooter({
            text: "KendiX's World.",
            iconURL: 'https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png',
            timestamp: new Date().getTime()
        });
    message.channel.send({ embeds: [embed] });
    return;
}

    try {
        // Vérifiez si le membre est mute
        if (!member.communicationDisabledUntil) {
            const embed = new EmbedBuilder()
                .setColor(0xFFFF00) // Couleur jaune
                .setAuthor({
                    name: 'Membre non mute',
                    iconURL: 'https://cdn.discordapp.com/avatars/1247928635596472513/3fa23e4abc032002e3c023bd439d2780.png'
                })
                .setDescription(`${member.user.tag} n'est pas mute.`)
                .setThumbnail('https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png')
                .setFooter({
                    text: "KendiX's World.",
                    iconURL: 'https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png',
                    timestamp: new Date().getTime()
                });
            message.channel.send({ embeds: [embed] });
            return;
        }

        // Lever le timeout du membre avec une raison
        await member.timeout(null, reason);
        const embed = new EmbedBuilder()
            .setColor(0xFFFF00) // Couleur jaune
            .setAuthor({
                name: 'Membre unmuté',
                iconURL: 'https://cdn.discordapp.com/avatars/1247928635596472513/3fa23e4abc032002e3c023bd439d2780.png'
            })
            .setDescription(`${member.user.tag} a été **unmute**. Raison : ${reason}`)
            .setThumbnail('https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png')
            .setFooter({
                text: "KendiX's World.",
                iconURL: 'https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png',
                timestamp: new Date().getTime()
            });
        message.channel.send({ embeds: [embed] });
    } catch (error) {
        console.error(error);
        const embed = new EmbedBuilder()
            .setColor(0xFFFF00) // Couleur jaune
            .setAuthor({
                name: 'Erreur',
                iconURL: 'https://cdn.discordapp.com/avatars/1247928635596472513/3fa23e4abc032002e3c023bd439d2780.png'
            })
            .setDescription('Une erreur s\'est produite en essayant de unmute le membre.')
            .setThumbnail('https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png')
            .setFooter({
                text: "KendiX's World.",
                iconURL: 'https://cdn.discordapp.com/avatars/802906957870661644/6c65b608ed0e2d428e9991224d03e19e.png',
                timestamp: new Date().getTime()
            });
        message.channel.send({ embeds: [embed] });
    }
}
});
