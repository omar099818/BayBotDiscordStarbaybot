const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "?";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});

//code



Client.on('message', async message => { // Alpha Codes Server.
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    var args = message.content.toLowerCase().split(" "); // Alpha Codes Server.
    var command = args[0];
 
  if(command == prefix + 'bc') {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':no_entry: | You dont have **ADMINISTRATOR** Permission!'); // Alpha Codes Server.
        if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have **EMBED_LINKS** Permission!');
       
        let bcCommand = new Discord.RichEmbed()
        .setTitle(':white_check_mark: **BroadCast Command.**')
        .setColor('GREEN')
        .setDescription(`**\n${prefix}bc <MESSAGE>**\n➥ \`\`Send for all members the message.\`\`\n\n**${prefix}bc <ROLE> <MESSAGE>**\n➥ \`\`Send the message to members have the role selected.\`\`\n\n**${prefix}bc admins <MESSAGE>**\n➥ \`\`Send the message to members have ADMINISTRATOR permission.\`\`\n\n**${prefix}bc members <MESSAGE>**\n➥ \`\`Send the message to members not have ADMINISTRATOR permission.\`\``)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL)
       
        if(!args[1]) return message.channel.send(bcCommand); // Alpha Codes Server.
       
        var getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1]) || message.guild.roles.find(r => r.name.toLowerCase().includes(args[1]));
       
        if(args[1] === 'admins' || args[1] === 'members' || getRole) {
            var argsM = message.content.split(' ').slice(2).join(' ');
        }else if(args[1] !== 'admins' || args[1] !== 'members' || !getRole) { // Alpha Codes Server.
            var argsM = message.content.split(' ').slice(1).join(' ');
        }
       
        if(args[1] === 'admins' || args[1] === 'members') {
            if(args[1] === 'admins') {
                var admin = message.guild.members.filter(m => m.hasPermission('ADMINISTRATOR') && !m.user.bot);
                if(admin.size <= 1) return message.channel.send(':no_entry: | No admins in this server!');
               
                let notArgsM = new Discord.RichEmbed()
                .setTitle(':white_check_mark: **BroadCast Command.** (ADMINISTRATOR)')
                .setColor('GREEN')
                .setDescription(`**\n${prefix}bc admins <MESSAGE>**\n➥ \`\`Send the message to members have ADMINISTRATOR permission.\`\``)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL) // Alpha Codes Server.
               
                if(!argsM) return message.channel.send(notArgsM);
               
                let adminMsg = new Discord.RichEmbed()
                .setTitle(':white_check_mark: **BroadCast Command.** (ADMINISTRATOR)')
                .setColor('GREEN')
                .setDescription(`**\n**:red_circle: Are you sure to send the message to **${admin.size}** Admins?\n\n**➥ Message:**\n${argsM}`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL) // Alpha Codes Server.
               
                message.channel.send(adminMsg).then(msgB => {
                    msgB.react('✅').then(() => msgB.react('❎'))
                   
                    let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                    let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                    let send = msgB.createReactionCollector(sendR);
                    let dontSend = msgB.createReactionCollector(dontSendR);
                   
                    send.on('collect', r => {
                        msgB.delete();
                        message.channel.send(`:timer: | Wait some time to send the message to **${admin.size}** Admins ...`).then(msg => {
                            admin.forEach(async a => { // Alpha Codes Server.
                                let bcMessage = new Discord.RichEmbed()
                                .setTitle(`:loudspeaker: ${a.user.username}`)
                                .setColor('GREEN')
                                .addField(':pencil: **: المرسل »**', message.author.username, true)
                                .addField(':globe_with_meridians: **: السيرفر »**', message.guild.name, true)
                                .addField(':scroll: **: الرساله »**', argsM.replace('[user]', a))
                                .setTimestamp()
                                .setFooter(message.author.tag, message.author.avatarURL)
                               
                                a.send(bcMessage)
                                await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${admin.size}** Admins!`);
                            })
                        })
                    })
                    dontSend.on('collect', r => {
                        msgB.delete(); // Alpha Codes Server.
                        message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                    })
                })
            }else if(args[1] === 'members') {
                var member = message.guild.members.filter(m => !m.hasPermission('ADMINISTRATOR') && !m.user.bot);
                if(member.size === 0) return message.channel.send(':no_entry: | No members in this server!');
               
                let notArgsM = new Discord.RichEmbed()
                .setTitle(':white_check_mark: **BroadCast Command.** (MEMBER)')
                .setColor('GREEN')
                .setDescription(`**\n${prefix}bc members <MESSAGE>**\n➥ \`\`Send the message to members not have ADMINISTRATOR permission.\`\``)
                .setTimestamp() // Alpha Codes Server.
                .setFooter(message.author.tag, message.author.avatarURL)
               
                if(!argsM) return message.channel.send(notArgsM);
               
                let memberMsg = new Discord.RichEmbed()
                .setTitle(':white_check_mark: **BroadCast Command.** (MEMBER)')
                .setColor('GREEN')
                .setDescription(`**\n**:red_circle: Are you sure to send the message to **${member.size}** Members?\n\n**➥ Message:**\n${argsM}`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL)
               
                message.channel.send(memberMsg).then(msgB => {
                    msgB.react('✅').then(() => msgB.react('❎'))
                    // Alpha Codes Server.
                    let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                    let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                    let send = msgB.createReactionCollector(sendR);
                    let dontSend = msgB.createReactionCollector(dontSendR);
                   
                    send.on('collect', r => {
                        msgB.delete();
                        message.channel.send(`:timer: | Wait some time to send the message to **${member.size}** Members ...`).then(msg => {
                            member.forEach(async m => {
                                let bcMessage = new Discord.RichEmbed()
                                .setTitle(`:loudspeaker: ${m.user.username}`)
                                .setColor('GREEN')
                                .addField(':pencil: **:المرسل>>**', message.author.username, true)
                                .addField(':globe_with_meridians: **:السيرفر>>**', message.guild.name, true)
                                .addField(':scroll: **:الرساله>>**', argsM.replace('[user]', m))
                                .setTimestamp()
                                .setFooter(message.author.tag, message.author.avatarURL)
                               
                                m.send(bcMessage) // Alpha Codes Server.
                                await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${member.size}** Members!`);
                            })
                        })
                    })
                    dontSend.on('collect', r => {
                        msgB.delete();
                        message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                    })
                }) // Alpha Codes Server.
            }
        }else if(getRole) {
            var membersRole = message.guild.members.filter(m => m.roles.has(getRole.id) && !m.user.bot);
            if(membersRole.size === 0) return message.channel.send(`:no_entry: | No members have **${getRole.name}** Role!`);
           
            let notArgsM = new Discord.RichEmbed()
            .setTitle(`:white_check_mark: **BroadCast Command.** (${getRole.name})`)
            .setColor('GREEN')
            .setDescription(`**\n${prefix}bc <ROLE> <MESSAGE>**\n➥ \`\`Send the message to members have the role selected.\`\``)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL) // Alpha Codes Server.
           
            if(!argsM) return message.channel.send(notArgsM);
           
            let membersRoleMsg = new Discord.RichEmbed()
            .setTitle(`:white_check_mark: **BroadCast Command.** (${getRole.name})`)
            .setColor('GREEN')
            .setDescription(`**\n**:red_circle: Are you sure to send the message to **${membersRole.size}** Members?\n\n**➥ Message:**\n${argsM}`)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL)
           
            message.channel.send(membersRoleMsg).then(msgB => {
                msgB.react('✅').then(() => msgB.react('❎')) // Alpha Codes Server.
               
                let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                let send = msgB.createReactionCollector(sendR);
                let dontSend = msgB.createReactionCollector(dontSendR);
               
                send.on('collect', r => {
                    msgB.delete(); // Alpha Codes Server.
                    message.channel.send(`:timer: | Wait some time to send the message to **${membersRole.size}** Members ...`).then(msg => {
                        membersRole.forEach(async mR => {
                            let bcMessage = new Discord.RichEmbed()
                            .setTitle(`:loudspeaker: ${mR.user.username}`)
                            .setColor('GREEN')
                            .addField(':pencil: **Sender:**', message.author.username, true)
                            .addField(':globe_with_meridians: **Server:**', message.guild.name, true)
                            .addField(':scroll: **Message:**', argsM.replace('[user]', mR))
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.avatarURL)
                           
                            mR.send(bcMessage)
                            await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${membersRole.size}** Members!`); // Alpha Codes Server.
                        })
                    })
                })
                dontSend.on('collect', r => {
                    msgB.delete();
                    message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                })
            })
        }else if(args[1] !== 'admins' && args[1] !== 'members' && !getRole) {
            var allB = message.guild.members.filter(m => !m.user.bot);
            if(allB.size === 1) return message.channel.send(`:no_entry: | No members in this server!`);
           
            let allMsg = new Discord.RichEmbed() // Alpha Codes Server.
            .setTitle(`:white_check_mark: **BroadCast Command.** (ALL)`)
            .setColor('GREEN')
            .setDescription(`**\n**:red_circle: Are you sure to send the message to **${allB.size}** Members?\n\n**➥ Message:**\n${argsM}`)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL) // Alpha Codes Server.
           
            message.channel.send(allMsg).then(msgB => {
                msgB.react('✅').then(() => msgB.react('❎'))
               
                let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                let send = msgB.createReactionCollector(sendR);
                let dontSend = msgB.createReactionCollector(dontSendR); // Alpha Codes Server.
               
                send.on('collect', r => {
                    msgB.delete();
                    message.channel.send(`:timer: | Wait some time to send the message to **${allB.size}** Members ...`).then(msg => {
                        allB.forEach(async m => {
                            let bcMessage = new Discord.RichEmbed()
                            .setTitle(`:loudspeaker: ${m.user.username}`) // Alpha Codes Server.
                            .setColor('GREEN')
                            .addField(':pencil: **Sender:**', message.author.username, true)
                            .addField(':globe_with_meridians: **Server:**', message.guild.name, true)
                            .addField(':scroll: **Message:**', argsM.replace('[user]', m))
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.avatarURL)
                           
                            m.send(bcMessage)
                            await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${allB.size}** Members!`);
                        })
                    })
                })
                dontSend.on('collect', r => {
                    msgB.delete();
                    message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                })
            })
        }
    }
});


client.on('message', message => {
  var prefix = "*"
var args = message.content.split(" ").slice(1);    
if(message.content.startsWith(prefix + 'id')) {
var year = message.author.createdAt.getFullYear()
var month = message.author.createdAt.getMonth()
var day = message.author.createdAt.getDate()
var men = message.mentions.users.first();  
let args = message.content.split(' ').slice(1).join(' ');
if (args == '') {
var z = message.author;
}else {
var z = message.mentions.users.first();
}
 
let d = z.createdAt;          
let n = d.toLocaleString();  
let x;                      
let y;                        
 
if (z.presence.game !== null) {
y = `${z.presence.game.name}`;
} else {
y = "No Playing... |💤.";
}
if (z.bot) {
var w = 'بوت';
}else {
var w = 'عضو';
}
let embed = new Discord.RichEmbed()
.setColor("#502faf")
.addField('🔱| اسمك:',`**<@` + `${z.id}` + `>**`, true)
.addField('🛡| ايدي:', "**"+ `${z.id}` +"**",true)
.addField('♨| Playing:','**'+y+'**' , true)
.addField('🤖| نوع حسابك:',"**"+ w + "**",true)    
.addField('📛| الكود حق حسابك:',"**#" +  `${z.discriminator}**`,true)
.addField('**التاريح الذي انشئ فيه حسابك | 📆 **: ' ,year + "-"+ month +"-"+ day)    
.addField("**تاريخ دخولك للسيرفر| ⌚   :**", message.member.joinedAt.toLocaleString())    
 
.addField('**⌚ | تاريخ انشاء حسابك الكامل:**', message.author.createdAt.toLocaleString())
.addField("**اخر رسالة لك | 💬  :**", message.author.lastMessage)            
 
.setThumbnail(`${z.avatarURL}`)
.setFooter(message.author.username, message.author.avatarURL)
 
message.channel.send({embed});
  if (!message) return message.reply('**ضع المينشان بشكل صحيح  ❌ **').catch(console.error);
 
}
 
});


client.on('message', message=>{
 // البريفكس حقك هنا 


    let nour;
    if (message.mentions.users.first()) {
      nour = message.mentions.users.first();
    } else {
        nour = message.author;
    }

  var roles;
      if (message.member.roles.size === 1) {
          roles = '`None | لا يوجد`';
      } else {
          roles = message.member.roles.map(roles => `\`${roles.name}\``).join(', ')
      }

  if(message.content === prefix + 'myroles'){
    if(message.author.bot) return;
let myroles = new Discord.RichEmbed()
.setColor('#4CE782')
.setAuthor(nour.tag, nour.avatarURL)
.setThumbnail(nour.avatarURL)
.setTitle('MyRoles | رتبي :')
.setDescription(`**# - Roles | الرتب **: ${roles}`)
.setFooter(message.author.username, message.author.avatarURL)
.setTimestamp() 
message.channel.send(myroles)
  }
});
client.on('message', message => {
    if (message.content === "?helpadmin") {
        let pages = [`**[❖═════اومر ادمن═══════❖]
        ❖ ?kick <mention > ➾  kickلي اعطاء شخص
      
        ❖ ?setvoice  لي انشاء روم فويس اونلاين
      
        ❖ ?ban <mention> ➾ لي اعطاء شخص بان
      
        ❖ ?unban <mention> ➾ لي فك بان عن شخص
      
        ❖ ?mute <mention> ➾ لـ اعطاء ميوت لي شخص
      
        ❖ ?ct <name> ➾ لـ انشاء روم كتبي
      
        ❖ ?cv <name> ➾لـ انشاء روم صوتي
      
        ❖ ?bc <message>  ➾ لـ ارسال رسالة لي كل الاعضاء

        ❖ ?mc  ➾ لـ اغلاق الشات

        ❖ ?unmc  ➾ لـ فتح الشات

        ❖ ?rolebc  ➾ برود كاست للرتب 

        ❖ ?send  ➾ ارسال رسالة لروم باسم البوت

        ❖ ?clear  ➾ لـ حذف الشات 

        **`]
        let page = 1;
    
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setFooter(`Page ${page} of ${pages.length}`)
        .setDescription(pages[page-1])
    
        message.channel.send(embed).then(msg => {
    
        msg.react('◀').then( r => {
            msg.react('▶')
                
    
                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;


        const backwards = msg.createReactionCollector(backwardsFilter, { time: 2000000});
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 2000000});
    
    
    
            backwards.on('collect', r => {
                if (page === 1) return;
                page--;
                embed.setDescription(pages[page-1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed)
            })
            forwards.on('collect', r => {
                if (page === pages.length) return;
          
          page++;
                embed.setDescription(pages[page-1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed)
            })
            backwards.on('collect', r => {
                if (page === 1) return;
                page--;
                embed.setDescription(pages[page-1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed)
            })
            backwards.on('collect', r => {
                if (page === 1) return;
                page--;
                embed.setDescription(pages[page-1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed)
            })
            })
        })
        }
    });
 
client.on("guildCreate", guild => {
    client.channels.get("492583074689843200").send(' ***  BOT  ***   **Join To**   ***[ ' + `${guild.name}` + ' ]***   ,   **  Owner  **  ' + ' ***[ ' + '<@' + `${guild.owner.user.id}` + '>' + ' ]***  **|**  ***[ ' + '<' + `${guild.owner.user.username}` + '>' + ' ]***')
    });
    
    client.on("guildDelete", guild => {
    client.channels.get("492583074689843200").send(' ***  BOT  ***   **Leave From**   ***[ ' + `${guild.name}` + ' ]***   ,   **  Owner  **  ' + ' ***[ ' + '<@' + `${guild.owner.user.id}` + '>' + ' ]***  **|**  ***[ ' + '<' + `${guild.owner.user.username}` + '>' + ' ]***')
    });
client.on('message', message => {
        if (message.content.toLowerCase() === prefix + "inv") {
            if(!message.channel.guild) return;
        let embed = new Discord.RichEmbed()
        .setTitle(`:small_orange_diamond: Click Here To Invite | أضغط لدعوة البوت :small_orange_diamond: `)
        .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=491650508231016448&permissions=8&scope=bot`)
     message.channel.sendEmbed(embed);
       }
   });
client.on('message', function(msg) {
    
    if(msg.content.startsWith (prefix  + 'serv')) {
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`Showing Details Of  **${msg.guild.name}*`)
      .addField('🌐** نوع السيرفر**',`[** __${msg.guild.region}__ **]`,true)
      .addField('🏅** __الرتب__**',`[** __${msg.guild.roles.size}__ **]`,true)
      .addField('🔴**__ عدد الاعضاء__**',`[** __${msg.guild.memberCount}__ **]`,true)
      .addField('🔵**__ عدد الاعضاء الاونلاين__**',`[** __${msg.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
      .addField('📝**__ الرومات الكتابية__**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
      .addField('🎤**__ رومات الصوت__**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
      .addField('👑**__ الأونـر__**',`**${msg.guild.owner}**`,true)
      .addField('🆔**__ ايدي السيرفر__**',`**${msg.guild.id}**`,true)
      .addField('📅**__ تم عمل السيرفر في__**',msg.guild.createdAt.toLocaleString())
      msg.channel.send({embed:embed});
    }
  });
client.on('message',async message => {
  let args = message.content.split(" ").slice(1).join(" ");
  let role = message.guild.roles.find('name',args) || message.guild.roles.get(args);
 
 
  if(message.content.startsWith(prefix + "role-info")) {
    if(!args) return message.reply('اكتب اسم الرتبة');
    if(!role) return message.reply('هذه الرتبة غير موجودة');
    let iQp = new Discord.RichEmbed()
    .setAuthor(message.author.tag,message.author.avatarURL)
    .setTitle(message.guild.name)
    .setThumbnail(message.guild.iconURL)
    .addField('- اسم الرتبة',role.name,true)
    .addField('- اي دي الرتبة',role.id,true)
    .addField('- تم انشاء الرتبة',role.createdAt.toLocaleString(),true)
    .addField('- لون الرتبة',role.hexColor,true)
    .addField('- عدد الاعضاء الذي لديهم نفس الرتبة',role.members.size,true)
    .addField('- مركز الرتبة بين كل الرتب',role.position,true)
    .addField('- خصائص الرتبة',role.permissions,true)
    .setFooter(message.author.tag,message.author.avatarURL);
 
    message.channel.send(iQp);
  }
});
client.on('message', message => {
if (message.content.startsWith(prefix + 'help')) { //ALPHACODES
    let pages = [`
***__وصف عن البوت__***
**
:gem:  البوت فيه كثير ميزات حلوة و جميلة
 ا:rocket: البوت يعمل قرابة 24 ساعة
**
        ***__General orders__***
**
『?serv /يعرض لك معلومات عن السيرفر』
『?id / يعرض لك معلومات عنك』
『?myroles / لرؤية جميع رتبك الشخصية بالسيرفر』
『?helpadmin / مساعدة الادمن』
『?id / يعرض لك معلومات عنك』
『?link / لمعمل انفايت ( دعوة ) لشخص』
『?inv / لدعوة البوت الى سيرفرك』
『?support / سيرفر المساعدة』
『?cmind / لكتابة اي شيء تقوله داخل صورة』
『?servavatar / لرؤية صورة السيرفر』
『?count / لرؤية عدد الاعضاء بالسيرفر』
『?avatar / لرؤية صورة شخص 』
『?bot-info / لرؤية معلومات عن البوت 』
『?report / لرفع شكوى على عضو 』
『?servers / لرؤية عدد السيرفرات التي داخل بها البوت 』
『?myid / لمعرفة الايدي الخاص بك 』

**
   
`]
    let page = 1;
 
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setFooter(`Page ${page} of ${pages.length}`)
    .setDescription(pages[page-1])
 
    message.author.sendEmbed(embed).then(msg => {
 
        msg.react('◀').then( r => {
            msg.react('▶')
 
 
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
 
 
        const backwards = msg.createReactionCollector(backwardsFilter, { time: 2000000});
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 2000000});
 
 
 
        backwards.on('collect', r => {
            if (page === 1) return;
            page--;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        forwards.on('collect', r => {
            if (page === pages.length) return;
     
      page++;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        })
    })
    }
});
client.on('message', message => {
    if(message.content === '?help') {
        message.reply('تم ارساله بالخاص :white_check_mark: ');
    }
});
client.on('message', message => {
    if(message.content === '?support') {
        message.channel.send('https://discord.gg/nKUfPST');
    }
});
client.on('message', message => {
const prefix = "?";
  if (message.author.kick) return;
  if (!message.content.startsWith(prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
 
  let args = message.content.split(" ").slice(1);
 
  if (command == "kick") {
               if(!message.channel.guild) return;
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("You Don't Have KICK_MEMBERS Permission").then(msg => msg.delete(5000));
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("I Don't Have KICK_Members Permission");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
 
  if (message.mentions.users.size < 1) return message.reply("منشن شخص");
  if(!reason) return message.reply ("اكتب سبب الطرد");
  if (!message.guild.member(user)
  .bannable) return message.reply("لايمكنني طرد شخص اعلى من رتبتي");
 
  message.guild.member(user).kick(7, user);
 
  const banembed = new Discord.RichEmbed()
  .setAuthor('Kicked !', user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("User:",  `[ + ${user.tag} + ]`)
  .addField("By:", `[  + ${message.author.tag} +  ]`)
  .addField("Reason:", `[ + ${reason} +  ]`)
  client.channels.get("492583022982463500").send({embed : banembed})
}
});
client.on('message' , message => {
    ;
    let user = message.mentions.users.first()|| client.users.get(message.content.split(' ')[1])
    if(message.content.startsWith(prefix + 'unban')) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌|**\`ADMINISTRATOR\`لا توجد لديك رتبة`**');
        if(!user) return  message.channel.send(`Do this ${prefix} <@ID user> \n or \n ${prefix}unban ID user`);
        message.guild.unban(user);
        message.guild.owner.send(`لقد تم فك الباند عن الشخص \n ${user} \n By : <@${message.author.id}>`)
        var embed = new Discord.RichEmbed()
        .setThumbnail(message.author.avatarURl)
        .setColor("RANDOM")
        .setTitle('**●Unban** !')
        .addField('**●User Unban :** ', `${user}` , true)
        .addField('**●By :**' ,       ` <@${message.author.id}> ` , true)
        .setAuthor(message.guild.name)
        message.channel.sendEmbed(embed)
    }
});

client.on('message', message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
 
  let args = message.content.split(" ").slice(1);
 
  if (command == "ban") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  /*let b5bzlog = client.channels.find("name", "5bz-log");
 
  if(!b5bzlog) return message.reply("I've detected that this server doesn't have a 5bz-log text channel.");*/
  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if(!reason) return message.reply ("**اكتب سبب الطرد**");
  if (!message.guild.member(user)
  .bannable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");
 
  message.guild.member(user).ban(7, user);
 
  const banembed = new Discord.RichEmbed()
  .setAuthor(`BANNED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : banembed
  })
}
});
client.on('message', message=> {
    if (message.author.bot) return;
    if (message.isMentioned(client.user))
    {
    message.reply(" هلا ولله  ");
    }
});
client.on('message', function(message) {
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        var stewart = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('``رساله جديده في خاص البوت``')
            .setThumbnail(`${message.author.avatarURL}`)
            .setDescription(`\n\n\`\`\`${message.content}\`\`\``)
            .setFooter(`من (@${message.author.tag})  |  (${message.author.id})`)
        client.channels.get("492596898532818945").send({ embed: stewart });
    }
});
client.on('message', message => {

    if (message.content === "?mc") {
                        if(!message.channel.guild) return message.reply(' هذا الامر فقط للسيرفرات !!');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.reply("تم تقفيل الشات ✅ ")
           });
             }
if (message.content === "?unmc") {
    if(!message.channel.guild) return message.reply(' هذا الامر فقط للسيرفرات !!');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               message.reply("تم فتح الشات✅")
           });
             }



});


client.on('message', async msg => {
     client.snek = require('snekfetch');
    var p = "?"
  if(msg.content.startsWith(p + "cmind")) {
   let args = msg.content.split(' ').slice(1).join(' ');

 if(args.length < 1) return args.missing(msg, 'No text added', this.help);
  msg.channel.startTyping()
  const searchMessage = await msg.channel.send('🖌️Painting...');
  const { body } = await client.snek.get(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${encodeURIComponent(args)}`);
  msg.channel.send({file: { attachment:body.message, name: 'changemymind.png'}}).then(()=> { searchMessage.delete(); msg.channel.stopTyping(); });
};
});

client.on ("guildMemberRemove", member => {
   
})

client.on('message' , message => {
  ;
  if(message.author.bot) return;
  if(message.content.startsWith(prefix + "send")) {
    let args = message.content.split(" ").slice(1);


    let suggestmessage = args.join(" ").slice(22);
    let suggestchannel = message.mentions.channels.first();

    if (!suggestchannel) {
        return message.reply("Please Mention the channel!")
    }

    if (!suggestmessage) {
        return message.reply("Plase Give Text To send Channel!")
    
         
    }
     message.delete();
suggestchannel.send("@everyone  `||` @here ");
    let embed = new Discord.RichEmbed()
        .addField("**message**", `${suggestmessage}`)
        .setFooter(`by ${message.author.tag}`)
        .setTimestamp()
    suggestchannel.send({
        embed
    }).then(msg => {
        msg.react("✅").then(r => msg.react("❎"))
    });


    message.reply(`Your message is sended.`).then(msg => msg.delete(1000));
    return;
}
});
client.on("message", (message) => {
if (message.content.startsWith("?cv")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'voice');
    message.channel.sendMessage('تـم إنـشاء روم صـوتي')
    
}
});
client.on("message", (message) => {
if (message.content.startsWith("?ct")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'text');
message.channel.sendMessage('تـم إنـشاء روم كـتابـي')

}
});
client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(`:rose:  ولكم نورت السيرفر:rose: 
:crown:اسم العضو  ${member}:crown:  
انت العضو رقم ${member.guild.memberCount} `) 
}).catch(console.error)
})
client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content =='?count')
      var SaifDz = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTitle('🌷| Members info')
      .addBlankField(true)
      .addField('عدد اعضاء السيرفر',`${message.guild.memberCount}`)
      message.channel.send(SaifDz);
    });
client.on("message", message => {
    const prefix = "?"
              
          if(!message.channel.guild) return;
   if(message.author.bot) return;
      if(message.content === prefix + "servavatar"){ 
          const embed = new Discord.RichEmbed()
  
      .setTitle(`This is  ** ${message.guild.name} **  Photo !`)
  .setAuthor(message.author.username, message.guild.iconrURL)
    .setColor(0x164fe3)
    .setImage(message.guild.iconURL)
    .setURL(message.guild.iconrURL)
                    .setTimestamp()

   message.channel.send({embed});
      }
  });
 client.on('message' , najzx => {
          ;
          if(najzx.author.bot) return;
         
          if(najzx.content.startsWith(prefix + "rolebc")) {
            if (!najzx.member.hasPermission("ADMINISTRATOR"))  return;
            let args = najzx.content.split(" ").slice(1);
         
            if(!args[0]) {
              najzx.channel.send("قم بمنشنة الرتبة | +rolebc @everyone الرساله")
                return;
            }
            if(!args[1]) {
              najzx.channel.send("قم بكتابة الرسالة | +rolebc @everyone الرساله")
                return;
            }
         
              if(args[0] == "@everyone") {
                najzx.channel.send(`لقد تم ارسال هذه الرسالة الى ${najzx.guild.memberCount} اعضاء`)
                najzx.guild.members.forEach(m => {
                  m.send(
                  "**" + "السيرفر :" + "\n" +
                  `${najzx.guild.name}` + "\n" +
                  "المرسل :" + "\n" +
                  `${najzx.author.tag}` + "\n" +
                  "الرسالة :" + "\n" +
                  `${args[1]}` + "**"
                  )
                })
                return;
              }
         
                  var role = najzx.mentions.roles.first();
                    if(!role) {
                      najzx.reply("لا توجد رتبة بهذا الاسم")
                        return;
                    }
                najzx.guild.members.filter(m => m.roles.get(role.id)).forEach(n => {
                  n.send(
                  "**" + "السيرفر :" + "\n" +
                  `${najzx.guild.name}` + "\n" +
                  "المرسل :" + "\n" +
                  `${najzx.author.tag}` + "\n" +
                  "الرسالة :" + "\n" +
                  `${args[1]}` + "**"
                  )
                })
                najzx.channel.send(`لقد تم ارسال هذه الرسالة الى ${najzx.guild.members.filter(m => m.roles.get(role.id)).size} عضو`)
            }
        });
client.on('message', message => {  
if (message.author.boss) return;
;
if (!message.content.startsWith(prefix)) return;
let command = message.content.split(" ")[0];
command = command.slice(prefix.length);
let args = message.content.split(" ").slice(1);
if (command == "mute") {
if (!message.channel.guild) return;
if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("انت لا تملك صلاحيات !! ").then(msg => msg.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("البوت لايملك صلاحيات ").then(msg => msg.delete(5000));;
let user = message.mentions.users.first();
let muteRole = message.guild.roles.find("name", "Muted");
if (!muteRole) return message.reply("** لا يوجد رتبة الميوت 'Muted' **").then(msg => {msg.delete(5000)});
if (message.mentions.users.size < 1) return message.reply('** يجب عليك المنشن اولاً **').then(msg => {msg.delete(5000)});
let reason = message.content.split(" ").slice(2).join(" ");
message.guild.member(user).addRole(muteRole);
const muteembed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`Muted!`, user.displayAvatarURL)
.setThumbnail(user.displayAvatarURL)
.addField("**:busts_in_silhouette:  المستخدم**",  '**[ ' + `${user.tag}` + ' ]**',true)
.addField("**:hammer:  تم بواسطة **", '**[ ' + `${message.author.tag}` + ' ]**',true)
.addField("**:book:  السبب**", '**[ ' + `${reason}` + ' ]**',true)
.addField("User", user, true)  
message.channel.send({embed : muteembed});
var muteembeddm = new Discord.RichEmbed()
.setAuthor(`Muted!`, user.displayAvatarURL)
.setDescription(`
${user} انت معاقب بميوت كتابي بسبب مخالفة القوانين
 
 ${message.author.tag} تمت معاقبتك بواسطة
 
[ ${reason} ] : السبب
 
اذا كانت العقوبة عن طريق الخطأ تكلم مع المسؤلين
`)
.setFooter(`في سيرفر : ${message.guild.name}`)
.setColor("RANDOM")
 user.send( muteembeddm);
}
if (command == "unmute") {
if (!message.channel.guild) return;
if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("انتا لا تملك صلاحيات").then(msg => msg.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("البوت لايملك صلاحيات ").then(msg => msg.delete(5000));;
let user = message.mentions.users.first();
let muteRole = message.guild.roles.find("name", "Muted");
if (!muteRole) return message.reply("** لا يوجد رتبة الميوت 'Muted' **").then(msg => {msg.delete(5000)});
if (message.mentions.users.size < 1) return message.reply('** يجب عليك المنشن اولاً **').then(msg => {msg.delete(5000)});
let reason = message.content.split(" ").slice(2).join(" ");
message.guild.member(user).removeRole(muteRole);
const unmuteembed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`UnMute!`, user.displayAvatarURL)
.setThumbnail(user.displayAvatarURL)
.addField("**:busts_in_silhouette:  المستخدم**",  '**[ ' + `${user.tag}` + ' ]**',true)
.addField("**:hammer:  تم بواسطة **", '**[ ' + `${message.author.tag}` + ' ]**',true)
.addField("**:book:  السبب**", '**[ ' + `${reason}` + ' ]**',true)
.addField("User", user, true)  
message.channel.send({embed : unmuteembed}).then(msg => msg.delete(5000));
var unmuteembeddm = new Discord.RichEmbed()
.setDescription(`تم فك الميوت عنك ${user}`)
.setAuthor(`UnMute!`, user.displayAvatarURL)
.setColor("RANDOM")
  user.send( unmuteembeddm);
}
});
client.on('message', message => {
    if (message.content.startsWith("?avatar")) {
        if (message.author.bot) return
        var mentionned = message.mentions.users.first();
    var omar;
      if(mentionned){
          var omar = mentionned;
      } else {
          var omar = message.author;
          
      }
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor('Avatar Link :')
        .setTitle('Click Here')
        .setURL(`${omar.avatarURL}`)
        .setImage(`${omar.avatarURL}`)
        .setFooter('BayBot',client.user.avatarURL) 
      message.channel.sendEmbed(embed);
    }
});
client.on('message', Sal => { // By Salto7#4595
  if(Sal.content === '?bot-info') { //هنا تغير البرفيكس
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setThumbnail(client.user.avatarURL)
  .addField(' اسم البوت :trident: ', client.user.username, true)
  .setFooter(client.user.tag, client.user.avatarURL, true)
  .addField('تاق البوت :name_badge:', client.user.discriminator, true)
  .addField('ايدي البوت :shield: ', client.user.id, true)
  .addField('تاريخ صنع البوت :calendar:', client.user.createdAt, true) 
 .addField(' عدد السيرفرات التي بها',`[${client.guilds.size}]  `)
  .addField(' عدد الاعضاء ',` [${client.users.size}] `)
  .addField('الغرف ',`[${client.channels.size}]`) 
  .addField(' البنق ',`[${Date.now() - message.createdTimestamp}]`)
 Sal.channel.sendEmbed(embed);
}
});
 client.on('message', message => {
    if (message.content.startsWith("?link")) {
        message.channel.createInvite({
        thing: true,
        maxUses: 100,
        maxAge: 3600,
    }).then(invite =>
      message.channel.sendMessage(invite.url)
    )
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
          .setDescription("تم ارسال الرابط ")
           .setAuthor(client.user.username, client.user.avatarURL)
                 .setAuthor(client.user.username, client.user.avatarURL)
                .setFooter('طلب بواسطة: ' + message.author.tag)

      message.channel.sendEmbed(embed).then(message => {message.delete(10000)})
              const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")
        
    .setDescription("** مدة الرابط : ساعه | عدد استخدامات الرابط : 100 **")
      message.channel.sendEmbed(Embed11)
    }
});
client.on('message',async msg => {
  var p = "?";
  if(msg.content.startsWith(p + "user")) {
  if(!msg.guild.member(msg.author).hasPermissions('MANAGE_CHANNELS')) return msg.reply('❌ **go play minecraft**');
  if(!msg.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS'])) return msg.reply('❌ **البوت لا يمتلك صلاحية**');
  msg.guild.createChannel(`يتم تحضير الروم :[]` , 'voice').then(time => {
    time.overwritePermissions(msg.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
  setInterval(() => {
      var currentTime = new Date(),
Year = currentTime.getFullYear(),
Month = currentTime.getMonth() + 1,
Dat = currentTime.getDate()
      time.setName(`Members : ◤ → ${client.users.size} ← ◢`);
 },1000);
  });
  }
 
});
    client.on('guildMemberAdd', member => {
        let channel = member.guild.channels.find('name', 'welcome');
        let memberavatar = member.user.avatarURL
          if (!channel) return;
        let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setThumbnail(memberavatar)
            .addField('🎽 | name :  ',`${member}`)
            .addField('📢 | نورت السيرفر يا قلبي' , `Welcome to the server, ${member}`)
            .addField('🆔 | user :', "**[" + `${member.id}` + "]**" )
                    .addField('➡| انت العضو رقم',`${member.guild.memberCount}`)
                   
                      .addField("Name:",`<@` + `${member.id}` + `>`, true)
                         
                                         .addField(' الـسيرفر', `${member.guild.name}`,true)
                                           
         .setFooter(`${member.guild.name}`)
            .setTimestamp()
       
          channel.sendEmbed(embed);
        });
        
        client.on('guildMemberRemove', member => {
            var embed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.avatarURL)
            .setThumbnail(member.user.avatarURL)
            .setTitle(`الله معاك ✋:skin-tone-1: 😔`)
            .setDescription(`مع السلامه تشرفنا بك ✋:skin-tone-1: 😔 `)
            .addField('👤   تبقي',`**[ ${member.guild.memberCount} ]**`,true)
            .setColor('RED')
            .setFooter(`==== نــتــمــنــآ لــكــم آســتــمـــتــآع ====`, 'https://cdn.discordapp.com/attachments/397818254439219217/399292026782351381/shy.png')
        
        var channel =member.guild.channels.find('name', 'welcome')
        if (!channel) return;
        channel.send({embed : embed});
        })
client.on("voiceStateUpdate", (old, new1) => {
    var channel = "490096156492169220";
    var role = "Need Help"
    لول(old,new1,channel,role);
});

function لول(o,n,channel,role){
    if (!o.voiceChannel && n.voiceChannel) {
        if (n.voiceChannelID == channel) {
            n.addRole(n.guild.roles.find("name", role));
        };
    } else if (o.voiceChannel && !n.voiceChannel) {
        if (o.voiceChannelID == channel) {
            n.removeRole(n.guild.roles.find("name", role))
        }
    }
}
client.on('message', message => {/// الفا كود | Emoko#0001
     if (message.content === "?servers") {
         if(!message.channel.guild) return;
     let embed = new Discord.RichEmbed()
  .setColor("RANDOM") /// الفا كود | Emoko#0001
  .addField("**سيرفرات يلي البوت موجود فيها: **" , client.guilds.size)
  message.channel.sendEmbed(embed);
    }/// الفا كود | Emoko#0001
});
client.on('message' , message => {
  ;
  if(message.author.bot) return;
  if(message.content.startsWith(prefix + "ping")) {
 message.channel.send('Pong...').then((msg) => {
      msg.edit(`\`\`\`javascript\nTime taken: ${msg.createdTimestamp - message.createdTimestamp} ms.\nDiscord API: ${Math.round(client.ping)} ms.\`\`\``);
 })
  }  
 });
client.on("message", message => {
        let args = message.content.split(" ").slice(1);
      if (message.content.startsWith(prefix + 'report')) {
            let user = message.mentions.users.first();
            let reason = args.slice(1).join(' ');
            let modlog = client.channels.find('name', 'reports');
            if (!reason) return message.reply('**ضع سبباً مقنعاً**');
              if (message.mentions.users.size < 1) return message.reply('**يجب عليك منشن للعضو المراد الابلاغ عليه**').catch(console.error);
       
        if (!modlog) return message.reply('**لا يوجد روم بأسم report**');
        const embed = new Discord.RichEmbed()
          .setColor(0x00AE86)
          .setTimestamp()
          .addField('نوع الرسالة:', 'Report')
          .addField('المراد الابلاغ عليه:', `${user.username}#${user.discriminator} (${user.id}`)
          .addField('صاحب الابلاغ:', `${message.author.username}#${message.author.discriminator}`)
          .addField('السبب', reason);
          message.delete()
          return client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
          console.log('[report] Send By: ' + message.author.username)
      }
      });
client.on('message', async message =>{

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let sicon = message.author.displayAvatarURL;
  if(cmd === `?myid`) {
      var bots = new Discord.RichEmbed()

      .setDescription(`** Your id: ${message.author.id}  **`)
      .setColor('RANDOM')
      message.channel.send(bots);
  }
});
lient.on('message', message => {
	var prefix = "-";
   if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'clear')) {
if(!message.channel.guild) return message.channel.send('**This Command is Just For Servers**').then(m => m.delete(5000));
if(!message.member.hasPermission('MANAGE_MESSAGES')) return      message.channel.send('**You Do not have permission** `MANAGE_MESSAGES`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let request = `Requested By ${message.author.username}`;
message.channel.send(`**Are You sure you want to clear the chat?**`).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`Chat will delete`).then(m => m.delete(5000));
var msg;
        msg = parseInt();

      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "`` Chat Deleted ``",
        color: 0x06DF00,
        footer: {

        }
      }}).then(msg => {msg.delete(3000)});

})
reaction2.on("collect", r => {
message.channel.send(`**Chat deletion cancelled**`).then(m => m.delete(5000));
msg.delete();
})
})
}
});

});

client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(`:rose:  ولكم نورت السيرفر:rose: 
:crown:اسم العضو  ${member}:crown:  
انت العضو رقم ${member.guild.memberCount} `) 
}).catch(console.error)
})
client.on("message", message => {
    
    if (!message.content.startsWith(prefix)) return;
      let command = message.content.split(" ")[0];
      command = command.slice(prefix.length);
        if(command === "mskin") {
                const args = message.content.split(" ").slice(1).join(" ")
        if (!args) return message.channel.send("** Type your skin name **");
        const image = new Discord.Attachment(`https://visage.surgeplay.com/full/256/${args}`, "skin.png");
    message.channel.send(image)
        }
    });
client.on('guildCreate', guild => {
  var embed = new Discord.RichEmbed()
  .setColor(0x5500ff)
  .setDescription(`**شكراً لك لإضافه البوت الى سيرفرك**`)
      guild.owner.send(embed)
});
client.on('message', message => {
            if(!message.channel.guild) return;
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('?bcall')){
 if (message.author.id !== '383606619671494659') return message.reply('** هذا الأمر فقط لصاحب البوت و شكراًً **')
message.channel.sendMessage('جار ارسال الرسالة |✅')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
});
client.on('message', msg => {
  if (msg.content === 'السعودية') {      
    msg.channel.send("🇸🇦")
  }
});

client.on('message', msg => {
  if (msg.content === 'مصر') {      
    msg.channel.send("🇪🇬")
  }
});

client.on('message', msg => {
  if (msg.content === 'المغرب') {      
    msg.channel.send("🇲🇦")
  }
});

client.on('message', msg => {
  if (msg.content === 'العراق') {      
    msg.channel.send("🇮🇶")
  }
});

client.on('message', msg => {
  if (msg.content === 'الجزائر') {      
    msg.channel.send("🇩🇿")
  }
});

client.on('message', msg => {
  if (msg.content === 'الامارات') {      
    msg.channel.send("🇦🇪")
  }
});

client.on('message', msg => {
  if (msg.content === 'تونس') {      
    msg.channel.send("🇹🇳")
  }
});

client.on('message', msg => {
  if (msg.content === 'سوريا') {      
    msg.channel.send("🇸🇾")
  }
});

client.on('message', msg => {
  if (msg.content === 'ليبيا') {      
    msg.channel.send("🇱🇾")
  }
});

client.on('message', msg => {
  if (msg.content === 'قطر') {      
    msg.channel.send("🇶🇦")
  }
});

client.on('message', msg => {
  if (msg.content === 'الصومال') {      
    msg.channel.send("🇸🇴")
  }
});

client.on('message', msg => {
  if (msg.content === 'عمان') {      
    msg.channel.send("🇴🇲")
  }
});

client.on('message', msg => {
  if (msg.content === 'موريتانيا') {      
    msg.channel.send("🇲🇷")
  }
});
client.on('message', msg => {
  if (msg.content === 'فلسطين') {      
    msg.channel.send(":flag_ps:")
  }
});

if (command == "za5") {
	var prefix = "?";
    let say = new Discord.RichEmbed()
        .setTitle('Text emboss :')
   message.channel.send(`\n ${zalgo(args.join(' '))}`);
  }

});

client.on("message", message => {
	var prefix = "?";
	var args = message.content.split(' ').slice(1); 
	var msg = message.content.toLowerCase();
	if( !message.guild ) return;
	if( !msg.startsWith( prefix + 'role' ) ) return;
	if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(' **__ليس لديك صلاحيات__**');
	if( msg.toLowerCase().startsWith( prefix + 'roleremove' ) ){
		if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد سحب منه الرتبة**' );
		if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );if( message.mentions.members.first() ){
			message.mentions.members.first().removeRole( role1 );
			return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم سحب من **');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.removeRole( role1 ))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من الكل رتبة**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البوتات رتبة**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البشريين رتبة**');
		} 	
	} else {
		if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد اعطائها الرتبة**' );
		if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );if( message.mentions.members.first() ){
			message.mentions.members.first().addRole( role1 );
			return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم اعطاء **');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.addRole( role1 ))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء الكل رتبة**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البوتات رتبة**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البشريين رتبة**');
		} 
	} 
});

client.on('message', ra3d => {
var prefix = "?";
                        let args = ra3d.content.split(" ").slice(1).join(" ")
if(ra3d.content.startsWith(prefix + 'ccolors')) {
    if(!args) return ra3d.channel.send('`يرجي اختيار كم لون `');
             if (!ra3d.member.hasPermission('MANAGE_ROLES')) return ra3d.channel.sendMessage('`**⚠ | `[MANAGE_ROLES]` لا يوجد لديك صلاحية**'); 
              ra3d.channel.send(`**✅ |Created __${args}__ Colors**`);
                  setInterval(function(){})
                    let count = 0;
                    let ecount = 0;
          for(let x = 1; x < `${parseInt(args)+1}`; x++){
            ra3d.guild.createRole({name:x,
              color: 'RANDOM'})
              }
            }
       });

//code

client.login(process.env.BOT_TOKEN);
