class Feild{
  float permitivity;
  float k;
  ArrayList<PointCharge> pointCharges=new ArrayList<PointCharge>();
  Feild(float permitivity){
    this.permitivity=permitivity;
    this.k=1/(4*3.1415926535897*permitivity);
  }
  
  void addPointCharge(PointCharge p){
    pointCharges.add(p);
  }
  
  PVector getFeildAtPosition(PVector pos){
    PVector feild=new PVector(0,0);
    for(int i=0;i<this.pointCharges.size();i++){
      PointCharge myPC=this.pointCharges.get(i);
      PVector r=PVector.sub(pos,myPC.getPos());
      float distance=r.mag();
      r.normalize();
      if(distance!=0){
        feild.add(PVector.mult(r,(this.k*myPC.getCharge())/(distance*distance)));
      }
    }
    return (feild);
  }
}
