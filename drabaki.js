const Discord = require('discord.js');
const drabaki = new Discord.Client(),
get_phrases = require('./phrases');
let phrases = get_phrases.drabaki_phrases();
var catched_phrases = [];
var catched_numbers = [];
var selected_number = 0;
var remain_try = 5;

drabaki.login("process.env.DRABAKI_TOKEN");
drabaki.on('ready', () => { console.log('Danger'); })

drabaki.on('message', message => {
	if(message.cleanContent.startsWith('@Drabaki')){
		const args = message.content.slice(1).trim().split(/ +/);
		const command = (args[1] == undefined ? "chamada" : args[1]);
		switch(command){
		 case 'grr':
	     if(catched_phrases.length == phrases.length){catched_phrases = [];}
		 var choosen_phrase = 0;
		 do{
		 choosen_phrase = Math.floor((Math.random() * phrases.length));	 
		 }
		 while(catched_phrases.includes(choosen_phrase));
		 message.channel.send(phrases[choosen_phrase].toUpperCase());
		 catched_phrases.push(choosen_phrase);
		 break;
		 case 'danger':
		 var target_name = (message.author.username);
		 message.channel.send("OUSA MESMO ME ENFRENTAR? DESAPAREÇA!!!");
		 message.channel.send("```Markdown\n#Alerta! Drabaki irá atacar! Cuidado!```");
		 var results = ["```diff\n-"+target_name+" foi devorado pelo Drabaki.("+["Agora ele terá uma indigestão!","Quem é o próximo?","Obrigado pela refeição."][Math.floor((Math.random() * 3))]+")```",
		 "```diff\n+"+target_name+" conseguiu escapar! ("+["Mas por quanto tempo?","Por pura sorte!","Graças a um poporu que passou!"][Math.floor((Math.random() * 3))]+")```",
		 "```glsl\n#"+target_name+" morreu! ("+["Tropeçando sozinho.","Por um ataque do Drabaki!","Drabaki se contorceu de tanto rir!"][Math.floor((Math.random() * 3))]+")```"];
		 var message_result = results[Math.floor((Math.random() * results.length))];
		 setTimeout(function(){message.channel.send(message_result),6000});
		 break;
		 case 'round':
		 if(selected_number == 0){
		 var target_name = (message.author.username);
		 if(!catched_numbers[message.channel.id]){catched_numbers[message.channel.id] = []}
		 message.channel.send("```Markdown\n#Aviso! "+target_name+" iniciou uma investida contra Drabaki!\n#Escolha um número entre 1 e 9 para ataca-lo!\n#Use a sintaxe @Drabaki attack numero_escolhido```");
		 selected_number = Math.floor((Math.random() * 9)) + 1;
		 }else{
		 message.channel.send("```diff\n-Uma instância já está ocorrendo. Termine-a antes de começar outra!\n Escolha um número pela sintaxe @Drabaki attack numero_escolhido```");	 
		 }
		 break;
		 case 'attack':
		 if(selected_number > 0){	 
		 if(args[2] > 0 && args[2] < 10){
		 var target_name = (message.author.username);
		 if(catched_numbers[message.channel.id].includes(args[2])){message.channel.send("```diff\n-Este número ja foi escolhido. Escolha outro!```");break;}
		 if(remain_try == 1){message.channel.send("```diff\n-Drabaki venceu!```");selected_number = 0;remain_try = 5;catched_numbers[message.channel.id] = [];break;}
		 message.channel.send("```diff\n"+target_name+" escolheu o número "+args[2]+"! "+(selected_number == args[2] ? "\n+A serpente foi derrotada!```" : "\n-Errou o ataque!\n-Tentativas restantes: "+(remain_try - 1)+"```"));
		 if(selected_number != args[2]){ remain_try--;catched_numbers[message.channel.id].push(args[2]);}else{selected_number = 0;remain_try = 5;catched_numbers[message.channel.id] = [];break;}
		 }else{
		 message.channel.send("```diff\n-Escolha um número válido entre 1 e 9!```");	 
		 }			 
		 }else{
		 message.channel.send("```diff\n-Não é possível usar o ataque pois não há uma instância inicializada. Use a sintaxe @Drabaki round para iniciar.```");	 
		 }
		 break;
		 case 'help':
		 message.channel.send("```diff\n+Comandos para interagir com o Drabaki (Mencione-o antes do comando):\ngrr: Drabaki irá falar alguma coisa.\n\ndanger: Drabaki irá lhe atacar.\n\nround: Inicia uma investida contra Drabaki.```");
		 default: 
		 message.channel.send("```diff\n-Aviso, este comando não foi reconhecido. Use @Drabaki help para ver os comandos disponíveis.```");
		}
	}
});
