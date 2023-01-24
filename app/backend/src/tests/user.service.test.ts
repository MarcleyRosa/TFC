import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const bodyRequest = {
  "email": "user@user.com",
  "password": "secret_user"
}

describe('Seu teste', () => {
  let chaiHttpResponse: Response;
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as unknown as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
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

   // const req = {};
  // const res = {};

  // const message = { message: 'Product not found' };
  // const status = 200;

  // res.status = sinon.stub().returns(res);
  // res.json = sinon.stub().returns()

  // sinon.stub(serviceProducts, 'getAllProducts').resolves(mockProducts)

  // await controllerProducts.routerAllProducts(req, res);

  // expect(res.status).to.have.been.calledWith(status)
