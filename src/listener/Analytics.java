package listener;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;

/**
 * Application Lifecycle Listener implementation class Analytics
 *
 */
@WebListener
public class Analytics implements HttpSessionAttributeListener {

    /**
     * Default constructor. 
     */
    public Analytics() {
        // TODO Auto-generated constructor stub
    }

	/**
     * @see HttpSessionAttributeListener#attributeAdded(HttpSessionBindingEvent)
     */
    public void attributeAdded(HttpSessionBindingEvent arg0)  { 
         // TODO Auto-generated method stub
    }

	/**
     * @see HttpSessionAttributeListener#attributeRemoved(HttpSessionBindingEvent)
     */
    public void attributeRemoved(HttpSessionBindingEvent arg0)  { 
         // TODO Auto-generated method stub
    }

	/**
     * @see HttpSessionAttributeListener#attributeReplaced(HttpSessionBindingEvent)
     */	
    public void attributeReplaced(HttpSessionBindingEvent arg0)  { 
         // TODO Auto-generated method stub
    }
    
    public void updatePopularBooks(HttpSessionBindingEvent arg0) {
//    	if(arg0.getName().equals("popularBooks")){
//    		if(theDouble > maxPrincipal) {
//    			setMaxPrincipal(theDouble);
////    			System.out.println(getMaxPrincipal());
//    			arg0.getSession().getServletContext().setAttribute("maxPrincipal", getMaxPrincipal());
//    		}
//    	}
    }
	
}
