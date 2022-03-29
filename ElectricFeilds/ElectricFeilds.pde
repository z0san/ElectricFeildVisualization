
int n=20;
float deltaT=0.00005;

ArrayList<PointCharge> pointCharges=new ArrayList<PointCharge>();
Feild f= new Feild(8.85418782E-12);

void setup(){
  size(1024,1024);
  
  for(var i=0;i<n;i++){
    PointCharge pc=new PointCharge(random(1024),random(1024),1,1);
    pointCharges.add(pc);
    f.addPointCharge(pc);
  }
}

void draw(){
  background(0);
  //show feild
  colorMode(HSB,2*PI,100,100);
  for(var i=0;i<1024;i++){
    for(var j=0;j<1024;j++){
      PVector feildVal=f.getFeildAtPosition(new PVector(i,j));
      set(i,j,color(PI-feildVal.heading(),100,feildVal.mag()*1/20000));
    }
  }
  
  
  //show points
  colorMode(RGB,255);
  for(var i=0;i<n;i++){
    PointCharge pc=pointCharges.get(i);
    pc.move(f,deltaT);
    pc.show();
  }
  
  
  saveFrame("A0/####.png");
}
