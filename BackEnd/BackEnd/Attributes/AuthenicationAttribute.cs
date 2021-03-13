using BackEnd.Model;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BackEnd.Attributes
{
    public class AuthenicationAttribute : ActionFilterAttribute
    {
        private readonly StaffPosition _staffPosition;
        public AuthenicationAttribute(StaffPosition staffPosition)
        {
            _staffPosition = staffPosition;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
        }
    }
}
