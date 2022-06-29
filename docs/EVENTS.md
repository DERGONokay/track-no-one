# Census API event streaming

The following are the evens we are currently using

## Events

### KILLER STATS Events

- KILL = Death
- MAX_KILL = GainExperience_experience_id_29
- DEATH = Death
- ASSIST = GainExperience_experience_id_2
- HIGH_THREAT_KILL_ASSIST = GainExperience_experience_id_371
- EXTREME_THREAT_KILL_ASSIST = GainExperience_experience_id_372
- TEAMKILL = Death. And lookup faction_id
    - `/s:{SERVICE_ID}/get/ps2:v2/character/?character_id={CHARACTER_ID}`

### MEDIC STATS Events

- REVIVE = GainExperience_experience_id_7
- SQUAD_REVIVE = GainExperience_experience_id_53
- HEAL = GainExperience_experience_id_4
- SQUAD_HEAL = GainExperience_experience_id_51
- HEAL_ASSIST = GainExperience_experience_id_34
- SHIELD_REPAIR = GainExperience_experience_id_438
- SQUAD_SHIELD_REPAIR = GainExperience_experience_id_439

### ENGI STATS Events

- TERMINAL_REPAIR = GainExperience_experience_id_276
- GENERATOR_REPAIR = GainExperience_experience_id_87
- RESUPPLY
  - GainExperience_experience_id_34
  - GainExperience_experience_id_55 (SQUAD)
- VEHICLE_RESUPPLY
  - GainExperience_experience_id_240
  - GainExperience_experience_id_241 (SQUAD)
- MAX_REPAIR
  - GainExperience_experience_id_6
  - GainExperience_experience_id_142 (SQUAD)
- MANA_TURRET_REPAIR
  - GainExperience_experience_id_88
  - GainExperience_experience_id_257 (SQUAD)
- HARDLIGHT_BARRIER_REPAIR
  - GainExperience_experience_id_1375
  - GainExperience_experience_id_1378
- SUNDERER_REPAIR
  - GainExperience_experience_id_99
  - GainExperience_experience_id_140 (SQUAD)
- ANT_REPAIR
  - GainExperience_experience_id_653
  - unknown (SQUAD)
- LIGHTING_REPAIR
  - GainExperience_experience_id_93
  - GainExperience_experience_id_134 (SQUAD)
- LIGHTING_REPAIR
  - GainExperience_experience_id_100
  - GainExperience_experience_id_617 (SQUAD)
- PROWLER_REPAIR
  - GainExperience_experience_id_96
  - GainExperience_experience_id_137 (SQUAD)
- MAGRIDER_REPAIR
  - GainExperience_experience_id_94
  - GainExperience_experience_id_135 (SQUAD)
- CHIMERA_REPAIR
  - unknown
  - unknown (SQUAD)
- FLASH_REPAIR
  - GainExperience_experience_id_31
  - GainExperience_experience_id_28 (SQUAD)
- JAVELIN_REPAIR
  - GainExperience_experience_id_1481
  - GainExperience_experience_id_1482 (SQUAD)
- HARRASER_REPAIR
  - GainExperience_experience_id_303
  - GainExperience_experience_id_302 (SQUAD)
- REAVER_REPAIR
  - GainExperience_experience_id_97
  - GainExperience_experience_id_138 (SQUAD)
- MOSQUTO_REPAIR
  - GainExperience_experience_id_95
  - GainExperience_experience_id_136 (SQUAD)
- SCYTHE_REPAIR
  - GainExperience_experience_id_98
  - GainExperience_experience_id_139 (SQUAD)
- DERVISH_REPAIR
  - GainExperience_experience_id_359
  - GainExperience_experience_id_532 (SQUAD)
- VALKYRIE_REPAIR
  - GainExperience_experience_id_503
  - GainExperience_experience_id_505 (SQUAD)
- GALAXY_REPAIR
  - GainExperience_experience_id_91
  - GainExperience_experience_id_132 (SQUAD)
- LIBERATOR_REPAIR
  - GainExperience_experience_id_92
  - GainExperience_experience_id_133 (SQUAD)
- COLOSUS_REPAIR
  - GainExperience_experience_id_1451
  - GainExperience_experience_id_1452 (SQUAD)
- SPITFIRE_REPAIR
  - GainExperience_experience_id_581
  - GainExperience_experience_id_584 (SQUAD)

### SCOUT STATS Events

- Q_SPOT
  - GainExperience_experience_id_36
  - GainExperience_experience_id_54 (SQUAD)
- MOTION_SPOTTER
  - GainExperience_experience_id_293
  - GainExperience_experience_id_294 (SQUAD)
- SCOUT_RADAR
  - GainExperience_experience_id_353
  - GainExperience_experience_id_354 (SQUAD)
- GENERATOR_OVERLOADED = GainExperience_experience_id_234
- GENERATOR_SABILIZED = GainExperience_experience_id_235
- TERMINAL_HACK = GainExperience_experience_id_236
- TURRET_HACK = GainExperience_experience_id_237
- MOTION_SENSOR_SPOTTER_KILL = GainExperience_experience_id_370
- SPITFIRE_KILL = GainExperience_experience_id_579

### LOGISTICS STATS Events

- SUNDERER_SPAWN = GainExperience_experience_id_233
- GALAXY_SPAWN = GainExperience_experience_id_201
- VALKYRIE_SPAWN = GainExperience_experience_id_355 (Needs validation)
- LODESTAR_SPAWN = GainExperience_experience_id_1543 (Needs validation)
- SQUAD_SPAWN = GainExperience_experience_id_56
- TRANSPORT_ASSIST = GainExperience_experience_id_30
- BEACON_KILL = GainExperience_experience_id_270
- ROUTER_KILL = GainExperience_experience_id_1409

### OBJECTIVE STATS Events

- FACILITY_CAPTURE = PlayerFacilityCapture
- FACILITY_DEFENSE = PlayerFacilityDefend / GainExperience_experience_id_20
- POINT_HOLD = GainExperience_experience_id_556
- POINT_CAPTURE = GainExperience_experience_id_557

### ANTI-VEHICLE STATS Events

- VEHICLE_DESTROY = VehicleDestroy
- FLASH
  - KILL_ASSIST = GainExperience_experience_id_101
  - DAMAGE = GainExperience_experience_id_1395
- HARRASER
  - KILL_ASSIST = GainExperience_experience_id_304
  - DAMAGE = GainExperience_experience_id_1396
- SUNDERER
  - KILL_ASSIST = GainExperience_experience_id_113
  - DAMAGE = GainExperience_experience_id_289
- ANT
  - KILL_ASSIST = GainExperience_experience_id_654
  - DAMAGE = GainExperience_experience_id_665
- LIGHTING
  - KILL_ASSIST = GainExperience_experience_id_107
  - DAMAGE = GainExperience_experience_id_280
- JAVELIN
  - KILL_ASSIST = GainExperience_experience_id_1484
  - DAMAGE = GainExperience_experience_id_1502
- VANGUARD
  - KILL_ASSIST = GainExperience_experience_id_114
  - DAMAGE = GainExperience_experience_id_290
- PROWLER
  - KILL_ASSIST = GainExperience_experience_id_110
  - DAMAGE = GainExperience_experience_id_281
- MAGRIDER
  - KILL_ASSIST = GainExperience_experience_id_108
  - DAMAGE = GainExperience_experience_id_285
- CHIMERA
  - KILL_ASSIST = GainExperience_experience_id_???
  - DAMAGE = GainExperience_experience_id_???
- COLOSUS
  - KILL_ASSIST = GainExperience_experience_id_1453
  - DAMAGE = GainExperience_experience_id_1458
- REAVER
  - KILL_ASSIST = GainExperience_experience_id_111
  - DAMAGE = GainExperience_experience_id_287
- MOSQUITO
  - KILL_ASSIST = GainExperience_experience_id_109
  - DAMAGE = GainExperience_experience_id_286
- SCYTHE
  - KILL_ASSIST = GainExperience_experience_id_112
  - DAMAGE = GainExperience_experience_id_288
- DERVISH
  - KILL_ASSIST = GainExperience_experience_id_360
  - DAMAGE = GainExperience_experience_id_???
- VALKYRIE
  - KILL_ASSIST = GainExperience_experience_id_504
  - DAMAGE = GainExperience_experience_id_508
- LIBERATOR
  - KILL_ASSIST = GainExperience_experience_id_106
  - DAMAGE = GainExperience_experience_id_284
- GALAXY
  - KILL_ASSIST = GainExperience_experience_id_105
  - DAMAGE = GainExperience_experience_id_283
