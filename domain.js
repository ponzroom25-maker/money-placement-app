/* Pure workbook-aligned calculations. This module reads no browser storage and performs no network access. */
(() => {
  'use strict';
  const ROLE_KEYS=['use','protect','save','grow'];
  const amount=value=>Number(value)||0;
  const shortfall=(target,current)=>Math.max(amount(target)-amount(current),0);
  function assetTotals(accounts=[]){const totals={cash:0,investment:0,other:0,total:0};for(const a of accounts){const b=amount(a.balance);if(['普通預貯金','定期預金','現金'].includes(a.type))totals.cash+=b;else if(a.type==='投資・運用')totals.investment+=b;else totals.other+=b}totals.total=totals.cash+totals.investment+totals.other;return totals}
  function roleTotals(accounts=[]){const totals=Object.fromEntries(ROLE_KEYS.map(k=>[k,0]));for(const a of accounts)if(Object.hasOwn(totals,a.role))totals[a.role]+=amount(a.balance);return totals}
  function cashPlan(state){const assets=assetTotals(state.accounts),near=(state.goals||[]).filter(g=>g.period==='1年以内').reduce((v,g)=>v+amount(g.target),0),u=state.targets?.use,p=state.targets?.protect,ready=u!==null&&u!==undefined&&p!==null&&p!==undefined,keep=ready?amount(u)+amount(p)+near:null;return {current:assets.cash,use:u??null,protect:p??null,near,keep,candidate:keep===null?null:Math.max(assets.cash-keep,0)}}
  window.MoneyPlacementDomain={shortfall,assetTotals,roleTotals,cashPlan};
})();
