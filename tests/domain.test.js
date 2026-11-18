const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../domain.js',`file://${__filename}`).pathname,'utf8'),context);
const d=context.window.MoneyPlacementDomain;
const accounts=[
  {type:'普通預貯金',role:'protect',balance:15000},
  {type:'定期預金',role:'save',balance:25000},
  {type:'現金',role:'use',balance:5000},
  {type:'投資・運用',role:'grow',balance:40000},
  {type:'その他',role:'unknown',balance:3000},
  {type:'普通預貯金',role:'unknown',balance:2000},
];
assert.deepEqual(JSON.parse(JSON.stringify(d.assetTotals(accounts))),{cash:47000,investment:40000,other:3000,total:90000});
assert.deepEqual(JSON.parse(JSON.stringify(d.roleTotals(accounts))),{use:5000,protect:15000,save:25000,grow:40000});
assert.equal(d.shortfall(12000,5000),7000);
assert.equal(d.shortfall(2000,5000),0);
const state={accounts,targets:{use:10000,protect:20000,save:30000,grow:50000},goals:[
  {target:12000,period:'1年以内'}, {target:9000,period:'1〜3年'}, {target:4000,period:'1年以内'},
]};
assert.deepEqual(JSON.parse(JSON.stringify(d.cashPlan(state))),{current:47000,use:10000,protect:20000,near:16000,keep:46000,candidate:1000});
assert.equal(d.cashPlan({...state,targets:{use:null,protect:20000}}).keep,null);
assert.equal(d.cashPlan({...state,targets:{use:0,protect:0},goals:[]}).candidate,47000);
console.log('Calculation checks passed: category totals, unclassified role, shortfall floor, near-term goal sum, cash reserve, blank target and candidate floor.');
