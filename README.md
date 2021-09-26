# Track No one

## Combat efficiency

How we calculate a player's **combat efficiency**?

```
Combat efficency = KILLER_STATS + OBJECTIVE_STATS + MEDIC_STATS + ENGI_STATS + SCOUT_STATS + LOGISTIC_STATS
```

`KDA = (K+A-TK/D) * 0.6`

`KPH = (K/SESSION_LENGHT_IN_MIN) * 60`

`KILLER_STATS = KDA * KPH`

`OBJECTIVE_STATS = FC * (FD*0.20) * CP`

`MEDIC_STATS = TR * ((TH + SH) * 0.1)`

`ENGI_STATS = SUP * REP/2`

`SCOUT_STATS = QS * MS`

`LOGISTIC_STATS = (SS + SQ*2) + TA + (BK + RK*4) * 20`

---

* Killer stats
  * K: Kills
  * D: Deaths
  * A: Assist
  * TK: Team kills
* World activeness
  * FC: Facillities capture
  * FD: Facillities defended
  * CP: Capture points
* Medic stats
  * TR: Team revives
  * TH: Team heals
  * SH: Shield heals
* Engi stats
  * SUP: Engineer resupply
  * REP: Reppairs
* Scout stats
  * QS: Q spotting
  * MS: Motion spotting (Motion sensors)
* Logistics stats
  * SS: Sundy spawn
  * SQ: Squad spawn
  * TA: Transport assist
  * BK: Beacon kills
  * RK: Router kills