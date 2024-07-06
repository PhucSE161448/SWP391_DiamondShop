using Application.Interfaces.Groups;
using Application.ViewModels.Groups;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Groups
{
    public class GroupController : BaseController
    {
        private readonly IGroupService service;
        public GroupController(IGroupService _service)
        {
            service = _service;
        }
        [HttpPost]
        public async Task<IActionResult> CreateGroup([FromBody] AddGroupDTO addGroupDto)
        {
            var result = await service.AddGroup(addGroupDto);
            return Created(nameof(CreateGroup), result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroup(int id, [FromBody] UpdateGroupDTO updateGroupDto)
        {
            var result = await service.UpdateGroup(id, updateGroupDto);
            return Ok(result);
        }
        [HttpPut("{GroupId}/{isDeleted}")]
        public async Task<IActionResult> DeleteOrEnable(int GroupId, int isDeleted)
        {
            await service.DeleteOrEnable(GroupId, isDeleted > 0);
            return NoContent();
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroup(int id)
        {
            var result = await service.GetGroupById(id);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGroup()
        {
            var result = await service.GetAllGroup();
            return Ok(result);
        }
    }
}
