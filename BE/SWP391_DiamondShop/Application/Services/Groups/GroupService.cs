using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Groups;
using Application.ViewModels.Categories;
using Application.ViewModels;
using Application.ViewModels.Groups;
using Domain.Model;
using Mapster;

namespace Application.Services.Groups
{
    public class GroupService : IGroupService
    {
        private readonly IUnitOfWork _unitOfWork;

        public GroupService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<GroupDTO> AddGroup(AddGroupDTO addGroupDto)
        {
            var Group = addGroupDto.Adapt<Group>();
            await _unitOfWork.GroupRepo.AddAsync(Group);
            await _unitOfWork.SaveChangeAsync();
            return Group.Adapt<GroupDTO>();
        }

        public async Task<GroupDTO?> GetGroupById(int id)
        {
            var Group = await _unitOfWork.GroupRepo.GetAsync(x => x.Id == id);
            if (Group is null)
            {
                throw new NotFoundException("Group is not existed");
            }

            return Group.Adapt<GroupDTO>();
        }

        public async Task<GroupDTO> UpdateGroup(int id, UpdateGroupDTO updateGroupDto)
        {
            var Group = await _unitOfWork.GroupRepo.GetByIdAsync(id);
            if (Group is null)
            {
                throw new NotFoundException("Group is not existed");
            }
            _unitOfWork.GroupRepo.Update(updateGroupDto.Adapt(Group));
            await _unitOfWork.SaveChangeAsync();
            return Group.Adapt<GroupDTO>();
        }


        public async Task<List<GroupDTO>> GetAllGroup()
        {
            var categories = await _unitOfWork.GroupRepo.GetAllAsync();
            return categories.Adapt<List<GroupDTO>>();
        }

        public async Task DeleteOrEnable(int GroupId, bool isDeleted)
        {
            var Group = await _unitOfWork.GroupRepo.GetAsync(d => d.Id == GroupId);
            if (Group is null)
            {
                throw new NotFoundException("Group is not existed");
            }
            Group.IsDeleted = isDeleted;
            await _unitOfWork.SaveChangeAsync();
        }
    }
}
