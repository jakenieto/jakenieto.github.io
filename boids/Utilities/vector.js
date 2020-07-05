export default class Vector {
    
    constructor(components) {
        this.components = components
        this.length = components.length
    }

    static sub(v1,v2) {
        //assert(v1.components.length === v2.components.length,
        //        "Vector's do not share the same vector space")
        return new Vector(v1.components.map((n, i) => n - v2.components[i]));
    }

    static add(v1,v2) {
        //assert(v1.components.length === v2.components.length,
        //        "Vector's do not share the same vector space")
        return new Vector(v1.components.map((n, i) => n + v2.components[i]));
    }

    static dot(v1,v2) {
        //assert(v1.components.length === v2.components.length,
        //        "Vector's do not share the same vector space")
        return (v1.components.map((n, i) => n * v2.components[i])).reduce((acc,n) => n + acc);
    }

    static dist(v1,v2) {
        let sum = 0;
        for (let index = 0; index < v1.length; index++) {
            sum += Math.pow((v1.components[index] - v2.components[index]),2)  
        }
        return Math.sqrt(sum)
        
        //return Math.sqrt(v1.components.reduce((acc,n) => Math.pow((n - v2.components[v1.components.indexOf(n)]),2) + acc))

    }

    scale(c) {
        if(!Number.isNaN(c)) this.components = this.components.map((n) => n * c)
    }

    normalize() {
        if (this.mag() != 0) this.scale(1/this.mag())
    }

    mag() {
        //return Math.sqrt(this.components.reduce((acc,n) => n * n + acc))
        return Math.sqrt(this.components.map((n) => n * n).reduce((acc,n) => acc + n))
    }

    limit(l) {
        if (this.mag() > l && this.mag() > 0) this.scale((l/this.mag()))
    }
    
    add(v) {
        this.components = Vector.add(this,v).components
    }

    sub(v) {
        this.components = Vector.sub(this,v).components
    }
}







