using BackEnd.Model;

namespace BackEnd.Infrastructure.DTO
{
    public class StaffDto
    {
        public int id { get; set; }
        public float allowance { get; set; }
        public bool is_deleted { get; set; }
        public long join_date { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public StaffPosition position { get; set; }
        public float salary { get; set; }
    }
}
