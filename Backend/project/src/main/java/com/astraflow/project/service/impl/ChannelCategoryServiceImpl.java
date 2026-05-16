package com.astraflow.project.service.impl;

import com.astraflow.project.model.ChannelCategory;
import com.astraflow.project.repository.ChannelCategoryRepository;
import com.astraflow.project.service.ChannelCategoryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class ChannelCategoryServiceImpl implements ChannelCategoryService {

    @Autowired
    private ChannelCategoryRepository channelCategoryRepository;

    @Override
    public List<ChannelCategory> findAll() {
        return channelCategoryRepository.findAll();
    }

    @Override
    public Optional<ChannelCategory> findById(UUID id) {
        return channelCategoryRepository.findById(id);
    }

    @Override
    public List<ChannelCategory> findByTenantId(UUID tenantId) {
        return channelCategoryRepository.findByTenantIdOrderBySortOrderAsc(tenantId);
    }

    @Override
    @Transactional
    public ChannelCategory save(ChannelCategory category) {
        return channelCategoryRepository.save(category);
    }

    @Override
    @Transactional
    public ChannelCategory update(UUID id, ChannelCategory category) {
        channelCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ChannelCategory not found with id: " + id));
        category.setId(id);
        return channelCategoryRepository.save(category);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        channelCategoryRepository.deleteById(id);
    }

    @Override
    public boolean existsByNameAndTenantId(String name, UUID tenantId) {
        return channelCategoryRepository.existsByNameAndTenantId(name, tenantId);
    }


    @Override
    public Optional<ChannelCategory> findByNameAndTenantId(String name, UUID tenantId) {
        return channelCategoryRepository.findByNameAndTenantId(name, tenantId);
    }

}
