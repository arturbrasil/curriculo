#!/usr/bin/env python 
# -*- coding: utf-8 -*-
# -*- coding: utf-8 -*-
import zabbix_api
import sys
import csv

username='Admin'
password='zabbix'

zabbix_url='http://127.0.0.1/zabbix'

z=zabbix_api.ZabbixAPI(server=zabbix_url)
z.login(user=username, password=password)

def verifica(grupo):
	hostgroup = z.hostgroup.get(
	{
	'filter': { 'name': grupo}, 
#	'sortfield': 'name',
#	'sortorder': 'ASC',
#	'limit':2,
#	'select_hosts':'extend'
	})
	if not hostgroup:
		print("NÃO")
		grupo_id = cadastra_grupo(grupo)
		print(hostgroup)
	else:
		for groupid in hostgroup:
			grupo_id = groupid['groupid']
			#print(grupo)
	return grupo_id

def verifica_fabricante(fabricante):
	hostgroup = z.hostgroup.get(
	{
	'filter': { 'name': fabricante}, 
	#'sortfield': 'name',
	#'sortorder': 'ASC',
#	'limit':2,
#	'select_hosts':'extend'
	})
	if not hostgroup:
		print("NÃO")
		grupo_id = cadastra_fabricante(fabricante)
		print(hostgroup)
	else:
	   	for groupid in hostgroup:
			   grupo_id = groupid['groupid']
			   #print(grupo)
	return grupo_id



def cadastra_grupo(grupo):
	print("Cadastrando %s" % grupo)
	hostgroup = z.hostgroup.create({
		"name": grupo
		})
	group_id = hostgroup['groupids']
	#print(group_id)

def cadastra_fabricante(fabricante):
	print("fabricante %s" % fabricante)
	hostgroup = z.hostgroup.create({
		"name": fabricante
		})
	group_id = hostgroup['groupids']
	#print(group_id)


f = csv.reader(open('modelo.csv'), delimiter=',')
for [nome,ip, grupo, fabricante, modelo, tipo, snmp, latitude, longitude, status, local] in f:

	if fabricante == 'Mikrotik':
		continue
	else:
		group_id = verifica(grupo)
		groupfabricante_id = verifica_fabricante("Fabricante - " + fabricante)
		try:
			print('Cadastrando o host %s - %s no grupo %s' % (nome,ip,grupo))
			z.host.create({"host": ip, "name": nome + "-" + ip, 
		  "interfaces": [ 
                   {"type": "2", "main": "1", "useip": "1","ip": ip,"dns": "","port": "161", "details": {
                    "version": 2,
                    "bulk": 1,
                    "community": snmp,
                  # "securityname": "mysecurityname",
                  # "contextname": "",
                  # "securitylevel": 1
                }
                    }
		  ], 
		  "groups": [
			{ "groupid": group_id },  {"groupid": groupfabricante_id }],
		  "templates": [{ "templateid":	'10536'}], #id do template
		"inventory_mode": 0,
	        "inventory": {
	            "location_lat": latitude,
	            "location_lon": longitude,
	        }
			},
	)
		except Exception as e:
			print(e)



	if ip == 'IP':
		continue

	else:
		if fabricante != "Mikrotik":
			group_id = verifica(grupo)
			groupfabricante_id = verifica_fabricante("Fabricante - " + fabricante)
			try:
				print('Cadastrando o host %s - %s no grupo %s' % (nome,ip,grupo))
				z.host.create({"host": ip, "name": nome + "-" + ip, 
			  "interfaces": [ 
	                   {"type": "2", "main": "1", "useip": "1","ip": ip,"dns": "","port": "161", "details": {
	                    "version": 2,
	                    "bulk": 1,
	                    "community": snmp,
	                  # "securityname": "mysecurityname",
	                  # "contextname": "",
	                  # "securitylevel": 1
	                }
	                    }
			  ], 
			  "groups": [
				{ "groupid": group_id },  {"groupid": groupfabricante_id }],
			  "templates": [{ "templateid":	'10186'}], #id do template
			"inventory_mode": 0,
		        "inventory": {
		            "location_lat": latitude,
		            "location_lon": longitude,
		        }
				},
		)
			except Exception as e:
				print(e)








