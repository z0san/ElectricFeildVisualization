class PointCharge{
  float charge;
  PVector pos;
  PVector velocity;
  float mass;
  PointCharge(float x,float y,float charge,float mass){
    this.pos=new PVector(x,y);
    this.velocity=new PVector(0,0);
    this.charge=charge;
    this.mass=mass;
  }
  
  void move(Feild field,float delta){
    PVector feildAtPosition=field.getFeildAtPosition(this.pos);
    PVector force=PVector.mult(feildAtPosition,this.charge);
    PVector accelaration=PVector.div(force,this.mass);
    this.velocity.add(PVector.mult(accelaration,delta));
    this.pos.add(PVector.mult(this.velocity,delta));
  }
  
  void show(){
    
    noStroke();
    fill(255,255,255);
    circle(this.pos.x,this.pos.y,5);
  }
  
  PVector getPos(){return(this.pos);}
  float getCharge(){return (this.charge);}
}
