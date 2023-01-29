import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teams from '../database/models/Team.model';

import { Response } from 'superagent';
import { bodyRequest, mockMatcheCreate, mockMatches, teamMock, userMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams func findAll', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(teams, "findAll")
      .resolves(teamMock as any);
  });

  after(()=>{
    (teams.findAll as sinon.SinonStub).restore();
  })

  it('findAll Teams sucessful', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

       expect(chaiHttpResponse.status).to.equal(200);
       expect(chaiHttpResponse.body).to.deep.equal(teamMock);
  });

});

describe('Teams func findById', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(teams, "findOne")
      .resolves(teamMock as any);
  });

  after(()=>{
    (teams.findOne as sinon.SinonStub).restore();
  })

  it('create status 201', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')

       expect(chaiHttpResponse.body).to.deep.equal(teamMock);
       expect(chaiHttpResponse.status).to.equal(200);
  });

});
