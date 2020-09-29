const axios = require('axios');
const _ = require('lodash');
let  orgs= require('./qq')
const models = require('./models')
axios.defaults.headers.common['Auth-Token'] = 'foo bar';

const OrgM =models['Org']

const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

async function getAll(orgs, newOrgs) {
  const url = 'https://turkey.servicesadvisor.org/api/services/item/'


  for (let i = 0; i < orgs.length; i++) {
    const org = orgs[i];

    try {
      const response = await axios.get(url + org.oid);
      const newOrg = _.assign(org, response.data.data)
      await waitFor(2000);

      await OrgM.upsert(newOrg);

    } catch (error) {
      console.error(error);
    }
    
  }

}

async function doSo() {
  
orgs = _.take(orgs, 1000)
let newOrgs = [];
await getAll(orgs, newOrgs)

}

doSo()
