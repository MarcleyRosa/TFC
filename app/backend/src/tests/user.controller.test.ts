import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.model';

import { Response } from 'superagent';
import { bodyRequest, userMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users func findByUser', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as unknown as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('findByUser is not password', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: bodyRequest.email });

       expect(chaiHttpResponse.status).to.equal(400);
       expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('findByUser status 200', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ ...bodyRequest });

       expect(chaiHttpResponse.status).to.equal(200);
  });

});

// describe('Users func findAll', () => {
//   let chaiHttpResponse: Response;

//   before(async () => {
//     sinon
//       .stub(User, "findOne")
//       .resolves(userMock as unknown as User);
//   });

//   after(()=>{
//     (User.findOne as sinon.SinonStub).restore();
//   })

//   it('findAll is not password', async () => {
//     chaiHttpResponse = await chai
//        .request(app)
//        .get('/login/validate')

//        expect(chaiHttpResponse.status).to.equal(400);
//        expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
//   });

//   it('findAll status 200', async () => {
//     chaiHttpResponse = await chai
//        .request(app)
//        .get('/login/validate')

//        expect(chaiHttpResponse.status).to.equal(200);
//   });

// });
