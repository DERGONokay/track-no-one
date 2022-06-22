# Census API event streaming

The following is an attempt to fill one of the biggest holes in Daybreak's event streaming API

## Events

### KILLER STATS events

- KILL = Death
- DEATH = Death
- ASSIST = GainExperience_experience_id_2
- TEAMKILL = Death. And lookup faction_id
    - `/get/ps2:v2/character/?character_id=5428297992008763793`

### Other events

- Sprit fire turret kill = GainExperience_experience_id_579
- HEAL = GainExperience_experience_id_4
- HEAL ASSIST = GainExperience_experience_id_5
- HIGH THREAT KILL ASSIST = GainExperience_experience_id_371