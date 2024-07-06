using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.Groups;


namespace Application.Interfaces.Groups
{
    public interface IGroupService
    {
        Task<GroupDTO> AddGroup(AddGroupDTO addGroupDto);
        Task<GroupDTO?> GetGroupById(int id);
        Task<GroupDTO> UpdateGroup(int id, UpdateGroupDTO updateGroupDto);
        Task<List<GroupDTO>> GetAllGroup();

        Task DeleteOrEnable(int groupId, bool isDeleted);
    }
}
