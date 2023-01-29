import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import match from '../database/models/Matche.model';

import { Response } from 'superagent';
import { bodyRequest, mockMatcheCreate, mockMatches, userMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches func findAll', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(match, "findAll")
      .resolves(mockMatches as any);
  });

  after(()=>{
    (match.findAll as sinon.SinonStub).restore();
  })

  it('findAll Matches sucessful', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')

       expect(chaiHttpResponse.status).to.equal(200);
       expect(chaiHttpResponse.body).to.deep.equal(mockMatches);
  });

});

describe('Matches func create', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(match, "create")
      .resolves(mockMatches as any);
  });

  after(()=>{
    (match.create as sinon.SinonStub).restore();
  })

  // it('create status 201', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      .post('/matches')
  //      .send({ ...mockMatcheCreate });

  //      expect(chaiHttpResponse.status).to.equal(200);
  // });

});
