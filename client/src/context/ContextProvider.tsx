"use client"
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";

export const ContextProvider = ({children}:any) =>{
  
    return(
        <>

        <DynamicContextProvider 
        settings={{ 
          environmentId: '9abda808-38b5-4fa4-a8bb-c4bf25a582b1',
        }}> 
    
      {children}
      
      </DynamicContextProvider>

        
        </>
    )
}