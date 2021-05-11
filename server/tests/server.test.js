const {app}=require('../server');

const request=require('supertest');
const expect=require('expect');

const todoModel=require('../model/Todo');
const {ObjectID}=require('mongodb');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
  }, {
    _id: new ObjectID(),
    text: 'Second test todo'
  }];


//delete MOCHA all data from todo collection
beforeEach((done)=>{
    todoModel.deleteMany({}).then(()=>{
        return todoModel.insertMany(todos)
    }).then(()=>done());
})


//test MOCHA  post todo operation
describe('POST/Todo Operation',()=>{
    
    it('should the creat post',(done)=>{
        const text="Dhruv";
        request(app)
        .post('/todo')
        .send({text})
        .expect(200)
        .expect((res)=>{
            
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err)
            {
                return done(err);
            }

            todoModel.find().then((data)=>{
                
                expect(data.length).toBe(3);
                done();
            })
            .catch(err=>{
                done(err)
            })

        })
    })
})

//test MOCHA fetch all data
describe('to get all Data for Todo',()=>{
    it('Get /todo',(done)=>{
        request(app)
        .get('/todo')
        .expect(200)
        .expect((res)=>{
            expect(res.body.data.length).toBe(2)
        })
        .end(done);
    })
})

//test MOCHA fetch data using id
describe('GET /todo/:id',()=>{
    it("return todo ",(done)=>{
        request(app)
        .get(`/todo/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done);
    })
})

//test delete request Using MOCHA
describe("delete request",()=>{
    it("DELETE /todo/:id",(done)=>{
        request(app)
        .delete(`/todo/${todos[0]._id}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(todos[0].text)
        })
        .end((err,res)=>{
            if(err)
            {
                return done(err);
            }
            done();
            // todoModel.findById(todos[0]._id).then((todo)=>{
            //     // expect(todo).
            // })
        });
    })
})

//test Update request Using MOCHA
describe("update request",()=>{
    it("PUT /todo/:id",(done)=>{
        request(app)
        .put(`/todo/${todos[0]._id}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe('Done');
        })
        .end((err,res)=>{
            if(err)
            {
                return done(err);
            }
            done();
            // todoModel.findById(todos[0]._id).then((todo)=>{
            //     // expect(todo).
            // })
        });
    })
})
