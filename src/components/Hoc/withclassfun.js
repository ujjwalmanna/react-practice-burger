import React from 'react';

const withclassfun=(WrappedComponent,classname)=>{
   return props=>(
     <div className={classname}>
         <WrappedComponent {...props}></WrappedComponent>
     </div>
   )
}

export default withclassfun;