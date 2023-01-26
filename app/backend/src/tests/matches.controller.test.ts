import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Matche.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockUserValidate = {
  "role": "user"
}

const userMock = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const findUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

const bodyRequest = {
  "email": "user@user.com",
  "password": "secret_user"
}

describe('Users func findByUser', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findOne")
      .resolves(userMock as unknown as Match);
  });

  after(()=>{
    (Match.findOne as sinon.SinonStub).restore();
  })

  it('...', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: bodyRequest.email });

       expect(chaiHttpResponse.status).to.equal(400);
       expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('Seu sub-teste', () => {
    expect(true).to.be.eq(true);
  });
});