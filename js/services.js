(function () {
	var myResumeServices = angular.module('myResumeServices', []);
	
	/**************************************
	* Data service
	***************************************/
	
	myResumeServices.factory('myResumeData', function (utility) {
		return {
			getProfile : function () {
				var profileData = {
					title            : 'Consultor Especialista !',
					name             : 'Artur Brasil',
					birthDate        : '09/08/1985',
					startWorkingDate : '01/03/2005',
					experience       : "$1 anos, $2 de experiência"
				};
				var age = utility.getDurationInYears(false, profileData.birthDate);
				var workExperience = utility.getDurationInYears(true, profileData.startWorkingDate);
				var experience = utility.replaceParameters(profileData.experience, [age, workExperience]);
				var profile = {
					title      : profileData.title,
					name  	   : profileData.name,
					experience : experience,
					test : "DSDS"
				};
				return profile;
			},
			getTagCloud : function() {
				var tagCloud = [
								{label:'tcpdump', level:2},
								{label:'tcpkill', level:0},
								{label:'mtr', level:0},
								{label:'nmap', level:2},
								{label:'Layer4', level:1},
								{label:'hping', level:1},
								{label:'tshark', level:2},
								{label:'ngrep', level:2},
								{label:'wireshark', level:2},
								{label:'vomit', level:0},
								{label:'dsniff', level:0},
								{label:'chaosreader', level:0},
								{label:'tcpkill', level:0},
								{label:'strings', level:0},
								{label:'Mausezahn', level:0},
								{label:'scapy', level:1},
								{label:'T50', level:0},
								{label:'Layer7 ', level:2},
								{label:'charles', level:0},
								{label:'fiddle', level:1},
								{label:'Chef', level:2},
								{label:'Layer2', level:2},
								{label:'Docker', level:1},
								{label:'Puppet', level:2},
								{label:'Layer6 ', level:1},
								{label:'mcollective', level:1},
								{label:'Vagrant ', level:1},
								{label:'Nginx', level:2},
								{label:'Layer3 ', level:2},
								{label:'Varnish', level:2},
								{label:'Apache', level:2},
								{label:'memcached', level:0},
								{label:'haproxy', level:2},
								{label:'stud', level:1},
								{label:'httpie', level:0},
								{label:'curl', level:1},
								{label:'mitmproxy', level:2},
								{label:'Layer1', level:0},
								{label:'Cisco', level:2},
								{label:'Networking', level:2},
								{label:'Mikrotik', level:2},
								{label:'Layer5 ', level:1},
								{label:'Ubiquity', level:1},
								{label:'Data cable', level:1},
								{label:'HCNA', level:2},
								{label:'GPON ', level:2},
								{label:'Layer5 ', level:1},
								{label:'EPON ', level:2},
								{label:'Perl', level:2},
								{label:'Jenkins', level:0},
								{label:'MSSQL', level:0},
								{label:'DynamoDb', level:0},
								{label:'Redis', level:1},
								{label:'deployd', level:0},
								{label:'Graphite', level:1},
								{label:'Gdash', level:1},
								{label:'Kibana', level:1},
								{label:'Graylog2', level:1},
								{label:'Windows', level:0},
								{label:'Loggly', level:0},
								{label:'RedShift', level:0},
								{label:'JavaScript', level:2},
								{label:'LogEntries', level:1},
								{label:'Linux', level:2},
								{label:'LogIO', level:2},
								{label:'Logstash', level:0},
								{label:'Sensu', level:0},
								{label:'Icinga', level:2},
								{label:'Nagios', level:2},
								{label:'Ganglia', level:0},
								{label:'Zenoss', level:0},
								{label:'Zabbix', level:2},
								{label:'Monit', level:0},
								{label:'Munin SupervisorD', level:0},
								{label:'Virtualization', level:0},
								{label:'Cloud', level:2},
								{label:'MacOS', level:1},
								{label:'AngularJS', level:1},
								{label:'Ruby', level:2},

				];
				return tagCloud;
			},
			getSkills : function() {
				var skills = [
				
					{
					 title:'Métricas e Logging',
					 specificSkills: ['Graphite', 'Gdash', 'Kibana', 'Graylog2', 'RedShift', 'LogEntries',
'LogIO', 'Logstash']
					},	
					{
					 title:'Monitoramento',
					 specificSkills: ['Sensu', 'Icinga', 'Nagios', 'Ganglia', 'Zenoss' , 'Zabbix', 'Monit', 'Munin', 'SupervisorD']
					},
					{
					 title:'Homologação',
					 specificSkills: ['Testes de Performance', ' TesteCarga', 'StressTest', ' Teste Regressão', "Usabilidade", "Segurança"]
					},
					{
					 title:'Redes',
					 specificSkills: ['Tcp/Udp', 'Cisco', 'ipv4 and ip6', 'L1, L2, L3', 'All OSI layers', 'FreeBsd']
					},
					{
					 title:'Cisco e Mikrotik (Indepentende)',
					 specificSkills: ['CCNP', 'CCNA', 'MTCNA','MTCRE']
					},
					{
					 title:'Cloud',
					 specificSkills: ['AWS(EC2, ELB, ROUTE53, S3, VPC, OPSWORKS)']
					},
					{
					 title:'Servidores Web',
					 specificSkills: ['Apache', 'Nginx', 'OpenResty']
					},
					{
					 title:'Proxy e cache',
					 specificSkills: ['Varnish', 'Squid', 'Redis', 'Nginx', 'OpenResty']
					},
					{
					 title:'Linguagens',
					 specificSkills: ['Perl', 'Ruby', 'Bash', 'Lua','Php', 'Erlang', 'Javascript','C/C++ (Arduino)']
					},
						{
					 title:'Web',
					 specificSkills:['RestFull', 'JQuery', 'AJAX', 'JSON', 'HTML5', 'CSS3', 'AngularJS', 'Twitter Bootstrap']
					},
					{
					 title:'Web FrameWorks',
					 specificSkills: ['Rails', 'Sails', 'Sinatra', 'Dancer', 'Lapis', 'Zotonic']
					},

					{
					 title:'Banco de dados',
					 specificSkills: ['Oracle', 'MySql', 'SQL', ]
					},
					{
					 title:'Systems',
					 specificSkills: ['Windows', 'Linux', 'Android' , 'MacOS', 'Unix', 'FreeBsd']
					},

					{
					 title:'Metodologias ',
					 specificSkills: ['Agile Scrum', 'Kanban']
					},
					{
					 title:'Others',
					 specificSkills: ['NodeJs', 'UML']
					}
				
				];
				return skills;
			},
			getProjects : function() {
				var projects = {
					project1 : {
						title : 'EM CONCLUSÃO: SuperServer II (Autenticador PPPoE)',
						desc1 : 'Autenticação de 9000 assinantes em 1 servidor com bandwidth de 3 gigabits por segundo',
						desc2 : 'Mpd5, Bonding , radius, perl, ng_graph, ng_netflow, FreeBsd or OpenBsd and DualStack em testes (Ipv6 and CGNAT).'
					},
					project2 : {
						title : 'Conversation Tracker',
						desc1 : 'A middleware for smtp protocol with a dashboard for sellers',
						desc2 : 'made Perl, Wing, SMTP, Ruby , Chef, AWS and OpsWorks'
					},
					project3 : {
						title : 'MuitoHotMesmo (Sistema de hotspot) ',
						desc1 : 'Autenticação e bilhetagem por tempo, créditos/cartões-pré-pagos ou logins. Feito em  Perl, Radius, Mysql, OpenWrt or Mikrotik or Ubiquity',
						desc2 : '#teste #hotelaria # provedores #suaEmpresa #suaRua #internetEmtodoLugar #mesh'
					},
					project4 : {
						title : 'Router, Profiler, Debbuger and API Trottling continous deploy for WEBAPPS ',
						desc1 : 'Perl, Ruby, Wing, Varnish, AWS and Opsworks',
						desc2 : 'Ngnix, Lua and OpenResty, Statsd, Redis.'
					},
					project5 : {
						title : 'Monitoring WebApps',
						desc1 : 'WebApps Monitor made Icinga, Perl, Ruby, ChefAWS EC2, ELB,',
						desc2 : 'ROUTE53, S3, VPC, SNS, OPSWORKS'
					},
					project6 : {
						title : 'Implements LogStash, Kibana, Graphite, Gdash',
						desc1 : 'made Ruby, AWS, OpsWorks',
						desc2 : ''
					}
				};
				return projects;
			},
			getContact : function() {
				var contact = {
					form : {
						error   : 'Tente novamente.',
						name    : 'Nome',
						email   : 'Email',
						message : 'Messagem',
						send    : 'Enviar',
						confirm : {
							part1 : 'Coloque sua menssagem !',
							part2 : 'TESte A',
							back  : 'TESTE B »'
						}
					},
					address : {
						city    : 'Angra dos Reis',
						zipCode : '23907205',
						email   : 'arturbrasil@gmail.com'
					}
				};
				 return contact;
			},
			getNavigation : function(){
				var nav = {
					profile : 'Perfil',
					skills  : 'Competencias',
					career  : 'Experiencia',
					projects : 'Projetos',
					contact : 'Contatos',
					tools : 'Ferramentas'
				};
				return nav;
			},
			getTimeline : function(){
				var timeline = {
					lang    : 'pt-br',
					content : 'https://docs.google.com/spreadsheet/pub?key=1Pw_9dCyzQzw5qOYn5nYN8VkH6o7RQ91R3qqmclnay8Y&output=html' 
				}
				return timeline;
			},
			getLinks : function(){
				var links = {
					github   : 'https://github.com/arturbrasil',
					facebook   : 'https://www.facebook.com/arturbrasil.angra',
					linkedin : 'https://br.linkedin.com/pub/artur-brasil/32/742/293',
					twitter  : 'https://twitter.com/arturbrasil',
					resume   : 'Artur_Brasil_visualcv_resume.pdf'
				}
				return links;
			},
			getTechnos : function(){
				var technos = {
					img : [
						{
							src   : '/img/technos/angularjs.png',
							title : 'AngularJS'
						},
						{
							src   : '/img/technos/html5.png',
							title : 'HTML5'
						},
						{
							src   : '/img/technos/css3.png',
							title : 'CSS3'
						},
						{
							src   : '/img/technos/bootstrap.jpg',
							title : 'Twitter Bootstrap'
						},
						{
							src   : '/img/technos/ascensorjs.jpg',
							title : 'AscensorJS'
						}
					],
					source : {
						text     : '',
						link     : ''
					}				
				}
				return technos;
			},
			getTools : function () {
				// body...
				var tools = [ 
					{
						nome: 'Autenticador',
						uso: 'editor de textos'
					}, 
					{	nome: 'Padre',
					 	uso: 'Ide Perl'
					 },
					 {	
					 	nome: 'Padre',
					 	uso: 'Ide Perl'
					 },
					 {	
					 	nome: 'Padre',
					 	uso: 'Ide Perl'
					 }
				];
				return tools;	
				}
		};
	});
	
	/**************************************
	* Mail service
	***************************************/
	
	myResumeServices.factory('mailManager', function($http){
		return {
			getContactTemplates : function(){
				return {contactForm:'views/contactForm.html', contactConfirm:'views/contactConfirmation.html'};
			},
			submitContactForm : function(data, callbackSuccess, callbackError){
				$http.post('index.html', {name:data.name, email:data.email, message:data.message})
				.success(function(){
					callbackSuccess();
				})
				.error(function(){
					callbackError();
				});
			}
		};
	});
	
	/**************************************
	* Timeline service
	***************************************/
	
	myResumeServices.factory('timelineManager', function(){
		return {
			launchTimeline : function(dataUrl, lang){
				MY_RESUME.launchTimeline(dataUrl, lang);
			}
		};
	});
	
	/**************************************
	* Utility service
	***************************************/
	
	myResumeServices.factory('utility', function(){
		return {
			contains : function(value1, value2){
				return MY_RESUME.contains(value1, value2);
			},
			getDurationInYears : function(greater, startDate, endDate){
				return MY_RESUME.getDurationInYears(greater, startDate, endDate);
			},
			replaceParameters : function(string, values){
				return MY_RESUME.replaceParameters(string, values);
			}
		};
	});
	
	/**************************************
	* Loader management
	***************************************/
	
	// http method for which we want to display a spinner 
	var httpMethodWithSpinner = 'POST';
	// intercept http methods to add treatment
	myResumeServices.factory('myHttpInterceptor', function($q, $rootScope){
		return {
			'request': function(config) {
				if(config.method == httpMethodWithSpinner){
					// show loader
					$rootScope.$broadcast("show_loader");
				}
				return config || $q.when(config);
			},
			'response': function(response) {
				if(response.config.method == httpMethodWithSpinner){
					$rootScope.$broadcast("hide_loader");
				}
				return response || $q.when(response);
			},
			'responseError': function (rejection) {
				if(rejection.config.method == httpMethodWithSpinner){
					$rootScope.$broadcast("hide_loader");
				}
				return $q.reject(rejection);
			}
		};
	});
	myResumeServices.config(function($httpProvider){
		$httpProvider.interceptors.push('myHttpInterceptor');
	});
	myResumeServices.directive("loader", function(){
		return {
			link : function($scope, element){
				// hide the element initially
				element.hide();
				$scope.$on("show_loader", function () {
					element.show();
				});
				$scope.$on("hide_loader", function () {
					element.hide();
				});
			}
		};
	});
	
})();
