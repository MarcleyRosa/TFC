import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teams from '../database/models/Matche.model';

import { Response } from 'superagent';
import { allTeamsModelMock, leaderboardHome, mockAllLeaderboard, mockLeaderboardAway, mockLeaderboardHome, mockLeaderboards } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Router leaderboard/home ', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(teams, "findAll")
      .resolves(leaderboardHome as any)
  });

  after(()=>{
    (teams.findAll as sinon.SinonStub).restore();
  })

  it('findAll Leaderboard Home sucessful', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/home')

       expect(chaiHttpResponse.body).to.deep.equal(mockLeaderboardHome);
       expect(chaiHttpResponse.status).to.equal(200);
  });

});

describe('Test Router Leaderboard', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(teams, "findAll")
        .resolves(allTeamsModelMock as any)
    });
  
    after(()=>{
      (teams.findAll as sinon.SinonStub).restore();
    })
  
    it('findAll Leaderboard sucessful', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard')
  
         expect(chaiHttpResponse.body).to.deep.equal(mockLeaderboards);
         expect(chaiHttpResponse.status).to.equal(200);
    });
  
});

describe('Test Router Leaderboard Aways', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(teams, "findAll")
        .resolves(allTeamsModelMock as any)
    });
  
    after(()=>{
      (teams.findAll as sinon.SinonStub).restore();
    })
  
    it('findAll Leaderboard/away sucessful', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard/away')
  
         expect(chaiHttpResponse.body).to.deep.equal(mockLeaderboardAway);
         expect(chaiHttpResponse.status).to.equal(200);
    });
  
});
  
  

