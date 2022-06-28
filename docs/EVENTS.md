# Census API event streaming

The following is an attempt to fill one of the biggest holes in Planetside 2 event streaming API

## Events

### KILLER STATS Events

- KILL = Death
- MAX_KILL = GainExperience_experience_id_29
- DEATH = Death
- ASSIST = GainExperience_experience_id_2
- HIGH_THREAT_KILL_ASSIST = GainExperience_experience_id_371 (Needs validation)
- EXTREME_THREAT_KILL_ASSIST = unkown
- TEAMKILL = Death. And lookup faction_id
    - `/s:{SERVICE_ID}/get/ps2:v2/character/?character_id={CHARACTER_ID}`

### MEDIC STATS Events

- REVIVE = unkown
- HEAL = GainExperience_experience_id_4
- SQUAD_HEAL = GainExperience_experience_id_51
- HEAL_ASSIST = GainExperience_experience_id_34
- SHIELD = unkown

### ENGI STATS Events

- SUPPLY = GainExperience_experience_id_34
- MAX_UNIT_REPAIR = GainExperience_experience_id_6
- MANA_TURRET_REPAIR = GainExperience_experience_id_88
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
  - unknown (SQUAD)
- MAGRIDER_REPAIR
  - unknown
  - unknown (SQUAD)
- CHIMERA_REPAIR
  - unknown
  - unknown (SQUAD)
- FLASH_REPAIR
  - GainExperience_experience_id_31
  - unknown (SQUAD)
- JAVELIN_REPAIR
  - unknown
  - unknown (SQUAD)
- HARRASER_REPAIR
  - GainExperience_experience_id_303
  - unknown (SQUAD)
- REAVER_REPAIR
  - unknown
  - unknown (SQUAD)
- MOSQUTO_REPAIR
  - GainExperience_experience_id_95
  - unknown (SQUAD)
- SCYTHE_REPAIR
  - unknown
  - unknown (SQUAD)
- DERVISH_REPAIR
  - unknown
  - unknown (SQUAD)
- VALKYRY_REPAIR
  - GainExperience_experience_id_503
  - unknown (SQUAD)
- GALAXY_REPAIR
  - GainExperience_experience_id_91
  - unknown (SQUAD)
- LIBERATOR_REPAIR
  - GainExperience_experience_id_92
  - unknown (SQUAD)
- COLOSUS
  - unkown
  - unknown (SQUAD)


### SCOUT STATS Events

- Q_SPOT = unkown (It seems that there isn't one)
- MOTION_SPOTTER
  - RECON_DEVICE = 
  - RADARS/SENSOR = unkown (It seems that it does not emmit events when getting motion sensor bonuses with vehicles radars and infil motion sensor)
- TERMINAL_HACK = GainExperience_experience_id_236
- TURRET_HACK = GainExperience_experience_id_237
- GENERATOR_OVERLOADED = unknown
- GENERATOR_SABILIZED = GainExperience_experience_id_235
- MOTION_SPOTTER_KILL = GainExperience_experience_id_370
- SPITFIRE_KILL = GainExperience_experience_id_579

### LOGISTICS STATS Events

- SUNDERER_SPAWN = GainExperience_experience_id_233
- SQUAD_SPAWN = unkown
- TRANSPORT_ASSIST = unkown
- BEACON_KILL = GainExperience_experience_id_207
- ROUTER_KILL = unkown

### OBJECTIVE STATS Events

- FACILITY_CAPTURE = PlayerFacilityCapture
- FACILITY_DEFENSE = PlayerFacilityDefend / GainExperience_experience_id_20
- POINT_HOLD = GainExperience_experience_id_556
- POINT_CAPTURE = GainExperience_experience_id_557

### ANTI-VEHICLE STATS Events

- VEHICLE_DESTROY = VehicleDestroy
- GROUND_TO_GROUND_DAMAGE = GainExperience_experience_id_1395
- GROUND_TO_AIR_DAMAGE = GainExperience_experience_id_1647
- AIR_TO_AIR_DAMAGE = 
- AIR_TO_GROUND_DAMAGE = 
- FLASH
  - KILL = GainExperience_experience_id_24
  - KILL_ASSIST = 
- HARRASER
  - KILL = 
  - KILL_ASSIST = 
- SUNDERER
  - KILL = 
  - KILL_ASSIST = 
- LIGHTING
  - KILL = 
  - KILL_ASSIST = 
- JAVELIN
  - KILL = 
  - KILL_ASSIST = 
- VANGUARD
  - KILL = 
  - KILL_ASSIST = 
- PROWLER
  - KILL = 
  - KILL_ASSIST = 
- MAGRIDER
  - KILL = 
  - KILL_ASSIST = 
- CHIMERA
  - KILL = 
  - KILL_ASSIST = 
- COLOSUS
  - KILL = 
  - KILL_ASSIST = 
- REAVER
  - KILL = 
  - KILL_ASSIST = 
- MOSQUITO
  - KILL = 
  - KILL_ASSIST = 
- SCYTHE
  - KILL = 
  - KILL_ASSIST = 
- DERVISH
  - KILL = 
  - KILL_ASSIST = 
- VALKYRY
  - KILL = 
  - KILL_ASSIST = GainExperience_experience_id_504
- LIBERATOR
  - KILL = 
  - KILL_ASSIST = 
- GALAXY
  - KILL = 
  - KILL_ASSIST = 
